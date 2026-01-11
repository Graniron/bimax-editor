import { generateText } from "ai";
import { inngest } from "./client";
import { google } from "@ai-sdk/google";

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ event, step }) => {
    await step.run("generate-text", async () => {
      return await generateText({
        model: google("gemini-2.5-flash-lite"),
        prompt: `Generate a very short welcome message for the email: test@gmail.com`,
      })
    });
    return { message: `Hello ${event.data.email}!` };
  },
);