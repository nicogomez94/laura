import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { randomSuffix, slugify } from "../utils/slug.js";

const debugProperties = [
  {
    title: "Departamento 3 Ambientes en Palermo",
    description:
      "Departamento con balcon corrido, cocina integrada y excelente conectividad. Ideal para vivienda o inversion.",
    category: "PROPIEDADES",
    operationStatus: "EN_VENTA",
    price: 185000,
    currency: "USD",
    totalM2: 78,
    coveredM2: 70,
    rooms: 3,
    bathrooms: 2,
    garageSpots: 1,
    address: "Av. Santa Fe 3150",
    neighborhood: "Palermo",
    city: "Buenos Aires",
    branch: "Capital Federal",
    published: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
        alt: "Living departamento Palermo",
        sortOrder: 0
      }
    ]
  },
  {
    title: "Emprendimiento en Pozo - Caballito",
    description:
      "Unidades de 1 a 4 ambientes con amenities y financiacion en cuotas durante obra.",
    category: "EMPRENDIMIENTOS",
    operationStatus: "EN_POZO",
    price: 89000,
    currency: "USD",
    totalM2: 48,
    coveredM2: 42,
    rooms: 2,
    bathrooms: 1,
    garageSpots: 0,
    address: "Av. Rivadavia 5900",
    neighborhood: "Caballito",
    city: "Buenos Aires",
    branch: "Capital Federal",
    published: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
        alt: "Render emprendimiento Caballito",
        sortOrder: 0
      }
    ]
  }
];

export async function ensureDebugData() {
  if (String(process.env.DEBUG_MODE).toLowerCase() !== "true") {
    return;
  }

  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash }
  });

  const currentCount = await prisma.property.count();
  if (currentCount > 0) {
    return;
  }

  for (const item of debugProperties) {
    const { images, ...property } = item;
    await prisma.property.create({
      data: {
        ...property,
        slug: `${slugify(property.title)}-${randomSuffix()}`,
        images: {
          create: images
        }
      }
    });
  }
}
