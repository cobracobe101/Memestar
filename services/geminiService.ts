
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateMoonCatchphrase(coinName: string, ticker: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a single, super hype, short "to the moon" catchphrase for a meme coin named ${coinName} ($${ticker}). Keep it under 10 words and use emojis.`,
      config: {
        temperature: 0.9,
      }
    });
    return response.text?.trim() || "Ready for blast off! 🚀";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Next 1000x potential found! 💎";
  }
}
