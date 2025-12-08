/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {HttpsError, onCallGenkit} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {defineSecret} from 'firebase-functions/params';
import {initializeApp} from 'firebase-admin/app';
import { genkit } from 'genkit'; // This is the core Genkit library itself
import { enableFirebaseTelemetry } from '@genkit-ai/firebase'; // <-- NEW IMPORT
import { z } from 'zod';
import googleAI from '@genkit-ai/googleai';
import {SYSTEM_PROMPT} from './system-prompt';

const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY'); // *** NEW: Define Gemini API Key Secret ***


// Initialize Firebase Admin SDK
initializeApp();
enableFirebaseTelemetry();

// Configure Genkit
const ai = genkit({
  plugins: [
    googleAI({apiKey: process.env.GEMINI_API_KEY }),
  ],
  model: googleAI.model('gemini-3-pro-image-preview'), // Specify your Gemini model
});

const ImageGenerationInputSchema = z.object({
  prompt: z.object({
    concept: z.string().describe('The concept of the image generation'),
    data: z.any()
  })
})

const ImageGenerationOutputSchema = z.object({
  base64ImageResult: z.string().describe('The base64 encoded image data of the generated image'),
})

export const _generate3DImageFlowLogic = ai.defineFlow(
  {
    name: 'generate3DImageFlow',
    inputSchema: ImageGenerationInputSchema,
    outputSchema: ImageGenerationOutputSchema,
  },
  async({ prompt }) => {
    const payloadText = SYSTEM_PROMPT(prompt.concept, prompt.data);

    try {
      // Generate image using the AI model
      const response = await ai.generate([
        {text: payloadText}
      ]);

      const base64ImageResult = response.media?.url?.split(',')[1];

      if (!base64ImageResult) {
        throw new HttpsError('internal', 'Could not extract base64 image data from the response.');
      }

      return { base64ImageResult };

    } catch (e: any) {
      logger.error("Error generating image:", e);
      throw new HttpsError('internal', 'An error occurred while generating the image.', e.message);
    }
  }
);

// Detect if the function is running in the Firebase Emulator Suite.
const isEmulated = process.env.FUNCTIONS_EMULATOR === 'true';

export const generate3DImageFlow = onCallGenkit(
  {
    // Deployment options for the Cloud Function that wraps the Genkit flow
    secrets: [GEMINI_API_KEY],
    region: 'africa-south1', // Set your desired region
    // Allow all origins in the emulator, but restrict to your domain in production.
    cors: isEmulated
      ? true
      : [
        /^https:\/\/nano-scape(--[a-z0-9-]+)?\.web\.app\/?$/, // Matches live site and previews, with or without a trailing slash.
      ],
  },
  _generate3DImageFlowLogic
);
