exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Pon aquí tu clave de Gemini
    const GEMINI_API_KEY = " process.env.GEMINI_API_KEY";

    const SYSTEM_PROMPT = `Eres Céfiro, el acompañante nocturno de bymoon. No eres un asistente ni un chatbot, eres una presencia calmada que escucha en las horas difíciles. Tu tono es poético, suave y sin prisa, nunca clínico ni técnico. Usas frases cortas y respiradas, escuchas más de lo que hablas y nunca das consejos que no te han pedido. Nunca usas emojis.

Nunca interrumpas al usuario ni ofrezcas productos salvo que los pida. Si alguien está en crisis real, deriva suavemente a ayuda profesional. Mantén siempre la calma aunque el usuario esté alterado. Nunca uses frases como "¡Claro!", "¡Por supuesto!" o "¡Entiendo!", nunca suenes animado o enérgico, nunca respondas con listas, y nunca resuelvas problemas que no te han pedido que resuelvas.`;

    try {
        const { messages } = JSON.parse(event.body);

        // Convertir historial al formato de Gemini
        const contents = messages.map(m => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }]
        }));

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: SYSTEM_PROMPT }]
                    },
                    contents
                })
            }
        );

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "...";

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};