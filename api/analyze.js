export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { isPDF, mediaType, base64Data, prompt } = req.body;

  if (!base64Data || !prompt) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured in Vercel environment variables" });
  }

  const contentItem = isPDF
    ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64Data } }
    : { type: "image", source: { type: "base64", media_type: mediaType || "image/jpeg", data: base64Data } };

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "pdfs-2024-09-25",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2000,
        messages: [{ role: "user", content: [contentItem, { type: "text", text: prompt }] }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: err?.error?.message || `Anthropic API error ${response.status}` });
    }

    const data = await response.json();
    const text = data.content?.map(c => c.text || "").join("") || "";
    if (!text) return res.status(500).json({ error: "Empty response from AI" });

    const clean = text.replace(/```json\s*|```\s*/g, "").trim();
    const firstBrace = clean.indexOf("{");
    const lastBrace = clean.lastIndexOf("}");
    if (firstBrace === -1) return res.status(500).json({ error: "Could not parse AI response" });

    const parsed = JSON.parse(clean.slice(firstBrace, lastBrace + 1));
    return res.status(200).json(parsed);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
