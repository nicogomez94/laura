import { prisma } from "../lib/prisma.js";

const TOKKO_PROPERTIES_URL = "https://www.tokkobroker.com/api/v1/property/";
const DEFAULT_PAGE_SIZE = 20;
const SUPPORTED_CURRENCIES = new Set(["USD", "ARS"]);

function toNonNegativeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

function toNonNegativeInteger(value) {
  return Math.round(toNonNegativeNumber(value));
}

function normalizeText(value, fallback = "") {
  const text = String(value || "").replace(/\r/g, "").trim();
  return text || fallback;
}

function mapOperation(operation) {
  const operationId = Number(operation?.operation_id);
  if (operationId === 2) return "EN_ALQUILER";
  if (operationId === 3) return "ALQUILER_TEMPORARIO";
  return "EN_VENTA";
}

function selectOperation(property) {
  for (const operation of property.operations || []) {
    const price = (operation.prices || []).find((item) =>
      SUPPORTED_CURRENCIES.has(String(item.currency || "").toUpperCase())
    );
    if (price) return { operation, price };
  }
  return null;
}

function locationParts(location) {
  return String(location?.full_location || location?.short_location || "")
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => part.toLowerCase() !== "argentina");
}

export function mapTokkoProperty(property, syncedAt = new Date()) {
  const selected = selectOperation(property);
  if (!selected || !property?.id) return null;

  const { operation, price } = selected;
  const parts = locationParts(property.location);
  const neighborhood = normalizeText(property.location?.name, parts.at(-1) || "Sin barrio");
  const city = parts.includes("Capital Federal")
    ? "Capital Federal"
    : (parts.at(-2) || parts.at(0) || "Buenos Aires");
  const propertyType = normalizeText(property.type?.name, "Propiedad");
  const title = normalizeText(
    property.publication_title,
    `${propertyType} en ${neighborhood}`
  );

  return {
    tokkoId: Number(property.id),
    tokkoLastSyncedAt: syncedAt,
    source: "TOKKO",
    slug: `tokko-${property.id}`,
    title,
    description: normalizeText(property.description, title),
    published: true,
    publicationStatus: "DISPONIBLE",
    category: property.development ? "EMPRENDIMIENTOS" : "PROPIEDADES",
    operationStatus: mapOperation(operation),
    price: toNonNegativeNumber(price.price),
    expenses: toNonNegativeNumber(property.expenses),
    currency: String(price.currency || "USD").toUpperCase(),
    totalM2: toNonNegativeInteger(property.total_surface),
    coveredM2: toNonNegativeInteger(property.roofed_surface),
    rooms: toNonNegativeInteger(property.room_amount),
    bathrooms: toNonNegativeInteger(property.bathroom_amount),
    garageSpots: toNonNegativeInteger(property.parking_lot_amount),
    address: normalizeText(property.real_address || property.address, "Dirección a consultar"),
    neighborhood,
    city,
    branch: normalizeText(
      property.branch?.display_name || property.branch?.name,
      "Laura Gutierrez Propiedades"
    ),
    images: (property.photos || [])
      .filter((photo) => photo?.image)
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
      .map((photo, index) => ({
        url: String(photo.image),
        alt: normalizeText(photo.description, `${title} - foto ${index + 1}`),
        sortOrder: index
      }))
  };
}

export async function fetchTokkoProperties({ apiKey, limit = 0, pageSize = DEFAULT_PAGE_SIZE }) {
  const properties = [];
  let offset = 0;
  const cappedPageSize = Math.min(Math.max(Number(pageSize) || DEFAULT_PAGE_SIZE, 1), 20);

  while (true) {
    const remaining = limit > 0 ? limit - properties.length : cappedPageSize;
    if (limit > 0 && remaining <= 0) break;

    const requestLimit = limit > 0 ? Math.min(cappedPageSize, remaining) : cappedPageSize;
    const url = new URL(TOKKO_PROPERTIES_URL);
    url.searchParams.set("format", "json");
    url.searchParams.set("lang", "es_ar");
    url.searchParams.set("limit", String(requestLimit));
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("key", apiKey);

    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) {
      throw new Error(`Tokko respondió ${response.status} al consultar propiedades.`);
    }

    const payload = await response.json();
    const page = Array.isArray(payload.objects) ? payload.objects : [];
    properties.push(...page);

    if (page.length === 0 || !payload.meta?.next) break;
    offset += requestLimit;
  }

  return properties;
}

export async function syncTokkoProperties({ apiKey, limit = 0 }) {
  const rawProperties = await fetchTokkoProperties({ apiKey, limit });
  const syncedAt = new Date();
  const mappedProperties = rawProperties
    .map((property) => mapTokkoProperty(property, syncedAt))
    .filter(Boolean);

  for (const mapped of mappedProperties) {
    const { images, slug, ...data } = mapped;
    await prisma.property.upsert({
      where: { tokkoId: data.tokkoId },
      create: {
        ...data,
        slug,
        images: { create: images }
      },
      update: {
        ...data,
        images: {
          deleteMany: {},
          create: images
        }
      }
    });
  }

  if (limit === 0) {
    const activeTokkoIds = mappedProperties.map((property) => property.tokkoId);
    await prisma.property.updateMany({
      where: {
        source: "TOKKO",
        tokkoId: { notIn: activeTokkoIds }
      },
      data: {
        published: false,
        publicationStatus: "NO_DISPONIBLE",
        tokkoLastSyncedAt: syncedAt
      }
    });
  }

  return {
    fetched: rawProperties.length,
    synced: mappedProperties.length,
    skipped: rawProperties.length - mappedProperties.length,
    limit
  };
}

let syncInProgress = false;

async function runConfiguredSync() {
  if (syncInProgress) return;
  syncInProgress = true;
  try {
    const limit = Math.max(Number(process.env.TOKKO_SYNC_LIMIT) || 0, 0);
    const result = await syncTokkoProperties({
      apiKey: process.env.TOKKO_API_KEY,
      limit
    });
    console.log(`Tokko sincronizado: ${result.synced}/${result.fetched} propiedades.`);
  } catch (error) {
    console.error("No se pudo sincronizar Tokko:", error.message);
  } finally {
    syncInProgress = false;
  }
}

export function startTokkoSync() {
  const enabled = String(process.env.TOKKO_SYNC_ENABLED).toLowerCase() === "true";
  if (!enabled || !process.env.TOKKO_API_KEY) return;

  void runConfiguredSync();
  const intervalMinutes = Math.max(Number(process.env.TOKKO_SYNC_INTERVAL_MINUTES) || 15, 1);
  const timer = setInterval(() => void runConfiguredSync(), intervalMinutes * 60 * 1000);
  timer.unref();
}
