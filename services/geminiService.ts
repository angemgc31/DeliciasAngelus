
import { GoogleGenAI } from "@google/genai";
import type { Product } from "../types";

const getGeminiService = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getDessertRecommendation = async (
  cravingDescription: string,
  availableProducts: Product[]
): Promise<string> => {
  try {
    const ai = getGeminiService();
    const productList = availableProducts.map(p => `${p.name}: ${p.description}`).join('\n');
    
    const prompt = `
      Eres un amigable y experto asistente de una tienda de postres. Un cliente tiene un antojo.
      Basado en la descripción del cliente y la lista de postres disponibles, recomienda el mejor postre.
      Responde de forma amigable y conversacional. Explica brevemente por qué tu recomendación es una buena elección.
      
      LISTA DE POSTRES DISPONIBLES:
      ${productList}

      DESCRIPCIÓN DEL ANTOJO DEL CLIENTE:
      "${cravingDescription}"

      Tu recomendación:
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Lo siento, parece que hay un problema con mi sistema de recomendaciones en este momento. ¿Podrías intentar describirme tu antojo de otra manera?";
  }
};
