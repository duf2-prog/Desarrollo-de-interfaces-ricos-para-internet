import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: './server/.env' });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;

    const params = new URLSearchParams();
    params.append("text", text);
    params.append("target_lang", "ES");

    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        "Authorization": `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("Proxy DeepL escuchando en http://localhost:3001");
  console.log("Clave cargada:", process.env.DEEPL_API_KEY);
});
