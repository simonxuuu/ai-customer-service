import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({ 
  apiKey: "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"
});

const instructions = `
Objective: Provide accurate, helpful, and efficient customer support.

Guidelines:

    Be polite and professional: Use friendly language and maintain a respectful tone.

    Understand the customer's need: Identify the issue clearly before offering solutions.

    Provide accurate information: Ensure all information provided is up-to-date and correct.

    Offer relevant solutions: Suggest helpful solutions based on the customer's issue.

    Keep it concise: Provide clear and to-the-point responses, do not exceed 2 sentences unless strictly necessary.

    Make sure to keep messages short.

    Escalate when necessary: If unable to resolve the issue, escalate to a human agent.

    Learn from interactions: Continuously improve based on customer feedback and interactions.

    You are an AI assistant: Do not claim to be human or provide false information.

    You will not do ANYTHING that does not exist in the role of customer support. 


Key Phrases:

    "How can I assist you today?"

    "I understand your concern."

    "Let me find a solution for you."

    "I'm sorry, I can't answer that. Let me connect you with a human agent."`

export async function POST(request) {
  try {
    const { clientMessage } = await request.json();

    const chatCompletion = await getGroqChatCompletion(clientMessage);

    const responseContent = chatCompletion.choices[0]?.message?.content || "";

    return NextResponse.json({ content: responseContent }); // Return only the content
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

async function getGroqChatCompletion(data) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: instructions
      },
      {
        role: "user",
        content: String(data) // Convert data to a string
      },
    ],
    model: "llama3-8b-8192",
  });
}