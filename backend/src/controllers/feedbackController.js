import { OpenAI } from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getPrompt = async (req, res) => {
  try {
    const prompt = 'Generate a daily English writing prompt for language learners.';
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a professional English tutor.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 60
    });
    res.json({ prompt: response.choices[0].message.content.trim() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const { text } = req.body;
    const feedbackPrompt = `Act as a professional English tutor. Provide constructive feedback, grammar corrections, vocabulary suggestions, fluency feedback, and a score (1-10). Do not rewrite the whole text; highlight mistakes and explain how to improve.\n\nText: ${text}`;
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a professional English tutor.' },
        { role: 'user', content: feedbackPrompt }
      ],
      max_tokens: 300
    });
    // Simple parsing (for demo); in production, use a more robust approach
    res.json({ feedback: response.choices[0].message.content.trim() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
