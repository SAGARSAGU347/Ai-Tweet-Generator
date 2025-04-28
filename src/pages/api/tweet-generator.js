import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic, mood } = req.body;

  if (!topic || !mood) {
    return res.status(400).json({ error: 'Topic and mood are required' });
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const output = await replicate.run(
      "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
      {
        input: {
          prompt: `Write a viral tweet about ${topic} with a ${mood} tone. Make it engaging and likely to go viral.`,
          system_prompt: "You are a viral tweet writer. Your tweets are engaging, witty, and often go viral. You use minimal hashtags and focus on creating shareable content."
        }
      }
    );

    if (!output) {
      throw new Error('No response from AI model');
    }

    res.status(200).json({ tweet: output });
  } catch (error) {
    console.error("AI tweet generation failed:", error);
    res.status(500).json({ error: error.message || "AI tweet generation failed" });
  }
}
