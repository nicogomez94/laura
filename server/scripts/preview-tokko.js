import dotenv from "dotenv";
import { fetchTokkoProperties, mapTokkoProperty } from "../src/services/tokko.js";

dotenv.config();

if (!process.env.TOKKO_API_KEY) {
  throw new Error("Falta TOKKO_API_KEY.");
}

const limit = Math.max(Number(process.env.TOKKO_SYNC_LIMIT) || 3, 1);
const properties = await fetchTokkoProperties({
  apiKey: process.env.TOKKO_API_KEY,
  limit
});

const preview = properties.map((property) => mapTokkoProperty(property)).filter(Boolean);
console.table(preview.map((property) => ({
  tokkoId: property.tokkoId,
  title: property.title,
  operation: property.operationStatus,
  price: `${property.currency} ${property.price}`,
  expenses: property.expenses,
  photos: property.images.length
})));
