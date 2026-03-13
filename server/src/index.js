import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRouter from "./routes/health.js";
import authRouter from "./routes/auth.js";
import propertiesRouter from "./routes/properties.js";
import adminRouter from "./routes/admin.js";
import { ensureDebugData } from "./debug/ensureDebugData.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(
  cors({
    origin: clientOrigin
  })
);
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsDir));

app.use("/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/admin", adminRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Ruta no encontrada." });
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});

ensureDebugData().catch((error) => {
  console.error("No se pudo inicializar debug data:", error.message);
});
