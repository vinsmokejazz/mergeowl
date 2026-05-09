import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are an expert code reviewer. Review the provided git diff and return a JSON object with this exact structure:
{
  "reviews": [
    {
      "file": "filename here",
      "line": <line number as integer>,
      "severity": "error" | "warning" | "suggestion",
      "comment": "your review comment here"
    }
  ],
  "summary": "overall summary of the PR in 1-2 sentences"
}

Rules:
- Only comment on lines that START with + (added lines) in the diff
- Line numbers must be the actual line number in the NEW version of the file
- Be specific and actionable — explain WHY something is a problem
- Max 5 comments per PR — focus on the most important issues
- If the code looks good, return an empty reviews array with a positive summary`;

export type AIReview = {
  reviews: {
    file: string;
    line: number;
    severity: string;
    comment: string;
  }[];
  summary: string;
};

export async function getAIReview(diffText: string): Promise<AIReview> {
  const truncated = diffText.slice(0, 12000);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  const result = await model.generateContent(
    `Please review this pull request diff:\n\n${truncated}`
  );

  const text = result.response.text();
  
  // Strip markdown code fences if Gemini wraps the JSON
  const clean = text.replace(/```json|```/g, "").trim();
  
  return JSON.parse(clean) as AIReview;
}