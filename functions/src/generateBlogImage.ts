// FROM HOMELESS TO $200M ARCHITECT
// QUANTUM CRYPTOGRAPHY PIONEER
// AI image generation flow using GenKit #quantumReady #billionDollarProof

import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import { genkit, z } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import { 
  vertexAI, 
  imagen3Fast 
} from "@genkit-ai/vertexai";
import { firebaseAuth } from "@genkit-ai/firebase/auth";
import { onFlow } from "@genkit-ai/firebase/functions";
import * as crypto from "crypto";
import * as logger from "firebase-functions/logger";
import { UserRecord } from "firebase-admin/auth";

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}

const storage = admin.storage();
const bucket = storage.bucket();

// Initialize Genkit with both GoogleAI (for Gemini) and VertexAI (for Imagen)
const ai = genkit({
  plugins: [
    googleAI(),
    vertexAI({ location: "us-central1" })
  ],
});

// Helper function to convert data URL to buffer
const dataUrlToBuffer = (dataUrl: string): Buffer => {
  // Extract the base64 encoded data from the Data URL
  const matches = dataUrl.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
  
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid data URL format');
  }
  
  return Buffer.from(matches[2], 'base64');
};

// Function to optimize the prompt for image generation
const optimizeImagePrompt = async (blogContent: string): Promise<string> => {
  // Use Gemini to generate a better prompt for image generation
  const response = await ai.generate({
    model: "gemini-1.5-flash", // Using Gemini Flash for faster response
    prompt: `Generate an image prompt that would be perfect for a blog post with the following content:
    
    ${blogContent}
    
    The image should be professional, attention-grabbing, and highly relevant to the blog's core message. Focus on creating a prompt that will generate an image that represents the main theme or metaphor of the blog.
    
    Return ONLY the image prompt text, without any explanations, disclaimers, or other text. The prompt should be under 100 words and highly specific.`,
  });

  return response.text.trim();
};

// The main Cloud Function using Genkit Flow pattern
export const generateBlogImage = onFlow(
  ai,
  {
    name: "generateBlogImage",
    inputSchema: z.object({
      prompt: z.string().min(5).max(1000),
      blogId: z.string().optional(),
    }),
    outputSchema: z.object({
      imageUrl: z.string(),
      prompt: z.string(),
    }),
    authPolicy: firebaseAuth((user: UserRecord) => {
      if (!user) {
        throw new Error("Authentication required to generate images");
      }
    }),
  },
  async (input: { prompt: string; blogId?: string }) => {
    logger.info("Generating blog image", { prompt: input.prompt });
    
    try {
      // Optimize the prompt using Gemini if it's a long blog excerpt
      let optimizedPrompt = input.prompt;
      if (input.prompt.length > 200) {
        optimizedPrompt = await optimizeImagePrompt(input.prompt);
        logger.info("Generated optimized prompt", { optimizedPrompt });
      }
      
      // Generate image using Imagen
      const imageResponse = await ai.generate({
        model: imagen3Fast,
        prompt: optimizedPrompt,
        output: { format: "media" },
      });
      
      if (!imageResponse.media) {
        throw new Error("Failed to generate image");
      }
      
      // Convert data URL to buffer for storage
      const imageBuffer = dataUrlToBuffer(imageResponse.media.url);
      
      // Create a unique filename
      const fileHash = crypto.createHash("md5").update(optimizedPrompt).digest("hex");
      const fileName = `generated-images/${Date.now()}-${fileHash}.png`;
      const file = bucket.file(fileName);
      
      // Upload to Firebase Storage
      await file.save(imageBuffer, {
        metadata: {
          contentType: "image/png",
          metadata: {
            prompt: optimizedPrompt,
            blogId: input.blogId || "",
          },
        },
      });
      
      // Get public URL for the uploaded image
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: "01-01-2100",
      });
      
      logger.info("Image generated and uploaded successfully", { fileName });
      
      return {
        imageUrl: url,
        prompt: optimizedPrompt,
      };
    } catch (error) {
      logger.error("Error generating image", error);
      throw new functions.https.HttpsError(
        "internal",
        `Failed to generate image: ${error}`
      );
    }
  }
); 