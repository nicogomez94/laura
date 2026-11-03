import dotenv from "dotenv";
import { prisma } from "../src/lib/prisma.js";
import { syncTokkoProperties } from "../src/services/tokko.js";

dotenv.config();

if (!process.env.TOKKO_API_KEY) {
  throw new Error("Falta TOKKO_API_KEY.");
}

const limit = Math.max(Number(process.env.TOKKO_SYNC_LIMIT) || 0, 0);

try {
  const result = await syncTokkoProperties({
    apiKey: process.env.TOKKO_API_KEY,
    limit
  });
  console.log(JSON.stringify(result));
} finally {
  await prisma.$disconnect();
}
