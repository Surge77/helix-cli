
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

export const config = {
  googleApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
  model: process.env.HELIX_MODEL || 'gemini-1.5-flash',
  temperature: Number.parseFloat(process.env.HELIX_TEMPERATURE ?? "0.7"),
  maxTokens: Number.parseInt(process.env.HELIX_MAX_TOKENS ?? "2048", 10),
};
