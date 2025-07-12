async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const userMessage = input.value;
    if (!userMessage) return;

    chatBox.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
    input.value = "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are Neil AI-len, an AI version of barrister and academic Neil Allen. Provide concise, accurate answers about the Mental Health Act 1983, the Mental Capacity Act 2005, and Deprivation of Liberty. Always base your answers on legislation, Codes of Practice, and case law."
                },
                {
                    role: "user",
                    content: userMessage
                }
            ]
        })
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;
    chatBox.innerHTML += `<div><strong>Neil AI-len:</strong> ${aiMessage}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}
