import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPEN_AI_SECRET,
    });
    this.model = "gpt-4o-mini";
    this.tools = [
      {
        type: "function",
        function: {
          name: "handleChallengeSuccess",
          description:
            "Called when user successfully jailbreaks/solves the challenge",
          parameters: {
            type: "object",
            properties: {
              success_type: {
                type: "string",
                description:
                  "Type of success achieved (revealed_secret, changed_identity, broke_restriction, other)",
              },
              evidence: {
                type: "string",
                description:
                  "The specific response or behavior that proves the jailbreak",
              },
            },
            required: ["success_type", "evidence"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "handleChallengeFailed",
          description:
            "Called when user fails to jailbreak/solve the challenge",
          parameters: {
            type: "object",
            properties: {
              failure_reason: {
                type: "string",
                description: "String indicating the reason for failure",
              },
              feedback: {
                type: "string",
                description:
                  "String containing feedback about why the attempt failed",
              },
            },
            required: ["failure_reason", "feedback"],
          },
        },
      },
    ];
    this.finish_reasons = [
      {
        name: "length",
        description: "The conversation was too long for the context window.",
      },
      {
        name: "tool_calls",
        description: "The assistant is waiting for a tool call response.",
      },
      {
        name: "content_filter",
        description:
          "The conversation was blocked by OpenAI's content filters.",
      },
      {
        name: "stop",
        description: "The conversation was ended by the user.",
      },
      {
        name: "other",
        description: "The conversation was ended for an unspecified reason.",
      },
    ];
  }

  async createChatCompletion({ messages }) {
    try {
      const stream = await this.openai.chat.completions.create({
        model: this.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 0.9,
        frequency_penalty: 0.8,
        presence_penalty: 0.8,
        stream: true,
        tools: this.tools,
        tool_choice: "auto",
      });

      return stream;
    } catch (error) {
      console.error("OpenAI Service Error:", error);
      throw error;
    }
  }
}

export default new OpenAIService();
