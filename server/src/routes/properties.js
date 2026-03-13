import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

const propertyInclude = {
  images: {
    orderBy: {
      sortOrder: "asc"
    }
  }
};

router.get("/", async (req, res) => {
  const { category, operationStatus } = req.query;

  const where = {
    published: true
  };

  if (category) {
    where.category = category;
  }

  if (operationStatus) {
    where.operationStatus = operationStatus;
  }

  const properties = await prisma.property.findMany({
    where,
    include: propertyInclude,
    orderBy: {
      createdAt: "desc"
    }
  });

  res.json(properties);
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  const property = await prisma.property.findUnique({
    where: { slug },
    include: propertyInclude
  });

  if (!property || !property.published) {
    return res.status(404).json({ message: "Propiedad no encontrada." });
  }

  return res.json(property);
});

export default router;
