import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { webhookRouter } from "./routes/webhook";

const app = express();
const PORT = process.env.PORT || 3000;

// Raw body parsing for webhook signature verification
app.use("/webhook", express.raw({ type: "*/*" }), (req, _res, next) => {
  if (Buffer.isBuffer(req.body)) req.body = req.body.toString("utf-8");
  next();
});

// Mount the router separately
app.use("/webhook", webhookRouter);

app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Server on port ${PORT}`));