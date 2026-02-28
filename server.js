const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// ==================== CONFIG ====================
const SYSTEM_ID = "admin";        // Login ID
const SYSTEM_PIN = "1208";        // Login PIN
const API_KEY = "e242ca1c-ec9d-47fc-9c02-1d3c96bc37c9"; // API Key

// ==================== LOGIN ====================
app.post("/api/login", (req, res) => {
  const { id, pin } = req.body;
  if (id === SYSTEM_ID && pin === SYSTEM_PIN) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// ==================== PROCESS IMEI ====================
app.post("/api/process-imei", async (req, res) => {
  const { imeis } = req.body;
  if (!Array.isArray(imeis)) return res.status(400).json({ error: "IMEI harus array" });

  let results = [];

  for (let imei of imeis) {
    try {
      const response = await fetch("http://76.13.198.120/api/v1/register-imei", {
        method: "POST",
        headers: {
          "X-API-Key": API_KEY,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ imei })
      });

      const text = await response.text();
      results.push({ imei, response: text });
    } catch (err) {
      results.push({ imei, response: "ERROR" });
    }
  }

  res.json(results);
});

// ==================== START SERVER ====================
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));