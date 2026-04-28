import express from "express";
import { auth } from "./lib/auth.js";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import { appConfig } from "./config/app.config.js";

const app = express();

app.use(
  cors({
    origin: appConfig.webUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/api/me", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ error: "No active session" });
    }

    return res.json(session);
  } catch (error) {
    console.error("Session error:", error);
    return res.status(500).json({ error: "Failed to get session" });
  }
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/device", async (req, res) => {
  const { user_code } = req.query;
  res.redirect(`${appConfig.webUrl}/device?user_code=${user_code}`);
});

app.listen(appConfig.port, () => {
  console.log(`Helix server listening on ${appConfig.serverUrl}`);
});
