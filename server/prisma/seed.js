import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

const debugProperties = [
  {
    title: "Departamento 3 Ambientes en Palermo",
    description:
      "Departamento con balcon corrido, cocina integrada y excelente conectividad. Ideal para vivienda o inversion.",
    category: "PROPIEDADES",
    operationStatus: "EN_VENTA",
    price: "185000",
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
      },
      {
        url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
        alt: "Cocina moderna",
        sortOrder: 1
      }
    ]
  },
  {
    title: "Casa 5 Ambientes en Nordelta",
    description:
      "Casa con jardin y pileta, lote interno y excelente orientacion. Terminaciones premium.",
    category: "PROPIEDADES",
    operationStatus: "EN_ALQUILER",
    price: "3200",
    currency: "USD",
    totalM2: 360,
    coveredM2: 280,
    rooms: 5,
    bathrooms: 3,
    garageSpots: 2,
    address: "Barrio Los Lagos 120",
    neighborhood: "Nordelta",
    city: "Tigre",
    branch: "Capital Federal",
    published: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687644-c94bf7f28f89?auto=format&fit=crop&w=1200&q=80",
        alt: "Frente de casa en Nordelta",
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
    price: "89000",
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

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function upsertAdminUser() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash }
  });
}

async function seedDebugProperties() {
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();

  for (const item of debugProperties) {
    const { images, ...property } = item;
    const slugBase = slugify(property.title);
    const slug = `${slugBase}-${Math.floor(Math.random() * 100000)}`;

    await prisma.property.create({
      data: {
        ...property,
        slug,
        images: {
          create: images
        }
      }
    });
  }
}

async function main() {
  await upsertAdminUser();

  if (String(process.env.DEBUG_MODE).toLowerCase() === "true") {
    await seedDebugProperties();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed finalizado.");
  })
  .catch(async (error) => {
    console.error("Error ejecutando seed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
