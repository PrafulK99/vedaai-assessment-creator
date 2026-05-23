import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface GenerateAssessmentParams {
  title: string;
  instructions: string;
  totalQuestions: number;
  totalMarks: number;
  questionTypes: Array<{ type: string; count: number; marks: number }>;
}

interface GeneratedQuestion {
  text: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  marks: number;
  options?: string[];
  answer: string;
}

export async function generateAssessmentWithGemini(
  params: GenerateAssessmentParams
): Promise<GeneratedQuestion[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const questionTypesStr = params.questionTypes
      .map((q) => `${q.count} ${q.type} questions (${q.marks} marks each)`)
      .join(", ");

    const prompt = `You are an expert educational assessment creator. Generate ${params.totalQuestions} questions for an assessment titled "${params.title}".

Instructions: ${params.instructions}

Question distribution: ${questionTypesStr}
Total marks: ${params.totalMarks}

Requirements:
1. Create questions that test different difficulty levels (easy, medium, hard)
2. For multiple choice questions, provide 4 options (A, B, C, D)
3. Include the correct answer
4. Ensure questions are clear and educational
5. Distribute marks appropriately

Return the response as a JSON array with this exact structure:
[
  {
    "text": "Question text here",
    "type": "Multiple Choice" or "Short Answer" or "Essay",
    "difficulty": "easy" or "medium" or "hard",
    "marks": number,
    "options": ["A", "B", "C", "D"] (only for multiple choice),
    "answer": "The correct answer"
  }
]

Only return the JSON array, no other text.`;

    console.log("🤖 Calling Gemini API for assessment generation...");
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse the JSON response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Failed to parse Gemini response as JSON");
    }

    const questions = JSON.parse(jsonMatch[0]) as GeneratedQuestion[];

    // Validate and clean questions
    const validatedQuestions = questions
      .slice(0, params.totalQuestions)
      .map((q, idx) => ({
        text: q.text || `Question ${idx + 1}`,
        type: q.type || "Multiple Choice",
        difficulty: (q.difficulty || "medium") as "easy" | "medium" | "hard",
        marks: q.marks || Math.ceil(params.totalMarks / params.totalQuestions),
        options: q.options || ["Option A", "Option B", "Option C", "Option D"],
        answer: q.answer || "Answer not provided",
      }));

    console.log(`✅ Generated ${validatedQuestions.length} questions with Gemini`);
    return validatedQuestions;
  } catch (error) {
    console.error("❌ Gemini API error:", error);
    throw new Error(
      `Failed to generate assessment with Gemini: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
