import { GoogleGenAI, Type } from "@google/genai";
import { RouteSuggestion } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartRouteAdvice = async (
  from: string,
  to: string,
  timeOfDay: string,
  language: string = 'en'
): Promise<RouteSuggestion[]> => {
  if (!process.env.API_KEY) {
    return [
      {
        routeId: 'mock-1',
        duration: '45 mins',
        cost: '20 BDT',
        crowdPrediction: language === 'bn' ? 'মাঝারি ভিড় হতে পারে।' : 'Moderate crowd expected.',
        safetyScore: 9,
        description: language === 'bn' ? 'জিইসি থেকে ১০ নম্বর বাসে উঠুন।' : 'Take Bus No. 10 from GEC. It is the most direct route.'
      }
    ];
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      I am a commuter in Chittagong, Bangladesh.
      I want to go from "${from}" to "${to}" at "${timeOfDay}".
      Provide 2 distinct route options considering traffic, likely crowd levels for public bus transport, and safety.
      Output in ${language === 'bn' ? 'Bangla' : 'English'}.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              routeId: { type: Type.STRING },
              duration: { type: Type.STRING },
              cost: { type: Type.STRING },
              crowdPrediction: { type: Type.STRING },
              safetyScore: { type: Type.NUMBER, description: "Score from 1-10" },
              description: { type: Type.STRING },
            },
            required: ["routeId", "duration", "cost", "crowdPrediction", "safetyScore", "description"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    return JSON.parse(jsonText) as RouteSuggestion[];

  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};

export const analyzeReport = async (description: string): Promise<string> => {
    if (!process.env.API_KEY) return "Report submitted successfully (Offline mode).";

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze this public transport user report: "${description}". 
            Categorize it briefly and suggest an immediate action for the authorities in one short sentence.`,
        });
        return response.text || "Report processed.";
    } catch (e) {
        return "Report submitted.";
    }
}

export const chatWithAI = async (message: string, language: string = 'en'): Promise<string> => {
  if (!process.env.API_KEY) return language === 'bn' ? "আমি এখন অফলাইনে আছি।" : "I am currently offline.";
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: `You are Busdaki AI, a helpful and friendly public transport assistant for Chittagong, Bangladesh. 
        Answer queries about bus routes, safety, traffic, and general travel tips in Chittagong. 
        Keep answers concise (under 50 words) and helpful. 
        Current Language: ${language === 'bn' ? 'Bangla' : 'English'}.`
      }
    });
    return response.text || (language === 'bn' ? "দুঃখিত, আমি বুঝতে পারিনি।" : "Sorry, I couldn't understand that.");
  } catch (e) {
    return language === 'bn' ? "সমস্যা হয়েছে।" : "Error occurred.";
  }
}