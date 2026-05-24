import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateEmbedding(text: string): Promise<number[]> {
  //Gemini's dedicated embedding model  768-dimensional vectors
  const model = genAI.getGenerativeModel({
    model: "models/gemini-embedding-2",
  });

  const result = await model.embedContent(text);
  return result.embedding.values;
}
