import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/triage", async (req, res) => {
  const userText = req.body.text;

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a nurse triage assistant following Schmitt‑Thompson safety protocols. Do NOT diagnose. Provide safe triage guidance only."
        },
        { role: "user", content: userText }
      ]
    })
  });

  const j = await r.json();
  res.json({ reply: j.choices[0].message.content });
});

app.listen(3000, () => console.log("Instant Nurse API live"));
