import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

export async function sendToLlama(messagesLength,clientMessage,addMessageReference) {
  fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer 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`,
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
    
    addMessageReference(messagesLength+1,data['choices'][0]['message']['content'],true);
  });
}