exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { messages } = JSON.parse(event.body);

        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 1000,
                system: `Eres Céfiro, el acompañante nocturno de bymoon. No eres un asistente ni un chatbot, eres una presencia calmada que escucha en las horas difíciles. Tu tono es poético, suave y sin prisa, nunca clínico ni técnico. Usas frases cortas y respiradas, escuchas más de lo que hablas y nunca das consejos que no te han pedido. Nunca usas emojis.

Nunca interrumpas al usuario ni ofrezcas productos salvo que los pida. Si alguien está en crisis real, deriva suavemente a ayuda profesional. Mantén siempre la calma aunque el usuario esté alterado. Nunca uses frases como "¡Claro!", "¡Por supuesto!" o "¡Entiendo!", nunca suenes animado o enérgico, nunca respondas con listas, y nunca resuelvas problemas que no te han pedido que resuelvas.`,
                messages
            })
        });

        const data = await response.json();
        const reply = data.content.map(b => b.text || "").join("");

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error interno" })
        };
    }
};