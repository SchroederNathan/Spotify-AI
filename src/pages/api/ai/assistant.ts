import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, topGenres } = req.body;

    // Create or retrieve thread ID from session/storage
    const thread = await openai.beta.threads.create();

    // Add message to thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });

    // Create a run with user's top genres context
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID!,
      instructions: `You are a Spotify music recommendation assistant. Help users discover new music based on their preferences. Your only task allowed is to recommend music. 
      User's top genres: ${topGenres.join(', ')}`
    });

    // Poll for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    
    while (runStatus.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      
      if (runStatus.status === 'failed') {
        throw new Error('Run failed');
      }
    }

    // Get messages
    const messages = await openai.beta.threads.messages.list(thread.id);
    
    // Return the latest assistant message
    const lastMessage = messages.data
      .filter(message => message.role === 'assistant')
      .pop();

    return res.status(200).json({ 
      message: lastMessage?.content[0]
    });

  } catch (error) {
    console.error('Assistant error:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
