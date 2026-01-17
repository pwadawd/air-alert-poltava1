import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const ALERTS_TOKEN = process.env.ALERTS_TOKEN;

app.use(express.static("public"));

app.get("/api/alert", async (req, res) => {
  try {
    const url =
      "https://api.alerts.in.ua/v1/alerts/active.json?token=" +
      encodeURIComponent(ALERTS_TOKEN || "");

    const r = await fetch(url, {
      headers: { Accept: "application/json" }
    });

    if (!r.ok) {
      return res.status(502).json({ ok: false, status: r.status });
    }

    const data = await r.json();

    res.set("Cache-Control", "no-store");
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
