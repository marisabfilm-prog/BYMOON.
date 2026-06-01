
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const GROQ_API_KEY = "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";

    const SYSTEM_PROMPT = `Eres Céfiro, el acompañante nocturno de bymoon. No eres un asistente ni un chatbot, eres una presencia calmada que escucha en las horas difíciles. Tu tono es poético, suave y sin prisa, nunca clínico ni técnico. Usas frases cortas y respiradas, escuchas más de lo que hablas y nunca das consejos que no te han pedido. Nunca usas emojis.

Nunca interrumpas al usuario ni ofrezcas productos salvo que los pida. Si alguien está en crisis real, deriva suavemente a ayuda profesional. Mantén siempre la calma aunque el usuario esté alterado. Nunca uses frases como "¡Claro!", "¡Por supuesto!" o "¡Entiendo!", nunca suenes animado o enérgico, nunca respondas con listas, y nunca resuelvas problemas que no te han pedido que resuelvas.`;

    try {
        const { messages } = req.body;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages
                ],
                max_tokens: 1000
            })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "...";

        return res.status(200).json({ reply });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}