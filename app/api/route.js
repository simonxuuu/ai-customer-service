import Groq from "groq-sdk";

const groq = new Groq({ apiKey: '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' , dangerouslyAllowBrowser: true});


export async function sendToLlama(messagesLength,clientMessage,addMessageReference) {

  const chatCompletion = await getGroqChatCompletion(clientMessage);
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
  addMessageReference(messagesLength+1,chatCompletion.choices[0]?.message?.content || "",true);
  /*
  fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer `,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "meta-llama/llama-3.1-8b-instruct:free",
      "messages": [
        {"role": "user", "content": clientMessage},
      ],
    })
  }).then((response) => response.json())
  .then((data) => {
    console.log('received');
    addMessageReference(messagesLength+1,data['choices'][0]['message']['content'],true);
  });
  */
}

export async function getGroqChatCompletion(data) {
  console.log(data);
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: data
      },
    ],
    model: "llama3-8b-8192",
  });
}