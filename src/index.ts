import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { webhookRouter } from "./routes/webhook";
import { apiRouter } from "./routes/api";

const app = express();
app.disable("x-powered-by");
const PORT = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000", "http://localhost:3001"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Raw body parsing for webhook signature verification
app.use("/webhook", express.raw({ type: "*/*" }), (req, _res, next) => {
  if (Buffer.isBuffer(req.body)) req.body = req.body.toString("utf-8");
  next();
});

// Mount the router separately
app.use("/webhook", webhookRouter);

app.use("/api", apiRouter);

app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Server on port ${PORT}`));