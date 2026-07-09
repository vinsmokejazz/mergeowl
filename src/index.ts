import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { webhookRouter } from "./routes/webhook";
import { apiRouter } from "./routes/api";
import { startWorker } from "./queue/worker";

const app = express();
app.disable("x-powered-by");
const PORT = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim().replace(/\/$/, ""))
  : ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const normalizedOrigin = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(normalizedOrigin) || allowedOrigins.includes("*")) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  }),
);

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

startWorker();

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
