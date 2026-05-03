import { Request, Response, Router } from "express";
import { githubApp } from "../github/app";

export const webhookRouter = Router();

webhookRouter.post("/", async (req: Request, res: Response) => {
   try {
    console.log("=== WEBHOOK HIT ===");
    console.log("Event:", req.headers["x-github-event"]);
    console.log("Body type:", typeof req.body);
    
    await githubApp.webhooks.verifyAndReceive({
      id: (req.headers["x-github-delivery"] as string) || "dummy-id",
      name: req.headers["x-github-event"] as any,
      signature: req.headers["x-hub-signature-256"] as string,
      payload: req.body, // Pass the expected payload string (no longer a Buffer)
    });

    res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(400).send("Bad Request");
  }
});
