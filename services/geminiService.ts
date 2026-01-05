import { GoogleGenAI } from "@google/genai";

export async function generateMoonCatchphrase(coinName: string, ticker: string): Promise<string> {
  // Create instance right before the call to ensure up-to-date API key usage
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, professional, and clear 1-sentence description for a meme cryptocurrency named ${coinName} ($${ticker}). Do not use slang, "to the moon", or hype words. Focus on the project's identity or community. Keep it under 10 words.`,
      config: {
        temperature: 0.5,
      }
    });
    return response.text?.trim() || "A community-focused meme coin project.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Official meme coin listing.";
  }
}