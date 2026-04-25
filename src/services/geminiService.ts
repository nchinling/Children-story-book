import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface StoryInput {
  characterType: string;
  setting: string;
  mood: string;
  topic?: string;
}

export interface StoryResult {
  title: string;
  content: string;
  illustrationPrompt: string;
}

export async function generateStory(input: StoryInput): Promise<StoryResult> {
  const prompt = `Generate a short, engaging children's story for ages 3-8.
  - Character Type: ${input.characterType}
  - Setting: ${input.setting}
  - Mood: ${input.mood}
  ${input.topic ? `- Topic/Main Event: ${input.topic}` : ''}

  The response must be in JSON format with exactly three fields:
  1. "title": A catchy title for the story.
  2. "content": The story content (at least 200 words but no more than 500, formatted with paragraphs).
  3. "illustrationPrompt": A descriptive prompt that can be used to generate a matching illustration (e.g., "A colorful watercolor illustration of a brave squirrel in a giant oak tree").
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING },
          illustrationPrompt: { type: Type.STRING },
        },
        required: ["title", "content", "illustrationPrompt"],
      },
    },
  });

  if (!response.text) {
    throw new Error("No story generated");
  }

  return JSON.parse(response.text.trim()) as StoryResult;
}

export async function generateIllustration(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: {
      parts: [{ text: `${prompt}, colorful children's book illustration style, soft edges, whimsical, vibrant` }],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No illustration generated");
}
