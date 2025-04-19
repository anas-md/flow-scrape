import { ExecutionEnvironment } from "@/lib/types";
import { ExtractDataWithAiTask } from "../task/ExtractDataWithAi";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/credential";
import OpenAi from "openai";

export async function ExtractDataWithAiExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>
): Promise<boolean> {
  try {
    const credentialId = environment.getInput("Credentials");
    if (!credentialId) {
      environment.log.error("input -> credentials is not defined");
      return false;
    }
    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("input -> content is not defined");
      return false;
    }
    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("input -> prompt is not defined");
      return false;
    }

    const credential = await prisma.credential.findUnique({
      where: {
        id: credentialId,
      },
    });

    if (!credential) {
      environment.log.error("Credential no found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);

    if (!plainCredentialValue) {
      environment.log.error("Cannot decrypt credential");
      return false;
    }

    const openAi = new OpenAi({
      apiKey: plainCredentialValue,
    });

    const response = await openAi.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text",
        },
        {
          role: "user",
          content: content,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
    });

    environment.log.info(
      `Prompt tokens used: ${JSON.stringify(response.usage?.prompt_tokens)}`
    );

    environment.log.info(
      `Completition tokens used: ${JSON.stringify(
        response.usage?.completion_tokens
      )}`
    );

    const result = response.choices[0].message?.content;

    if (!result) {
      environment.log.error("Empty response from AI");
      return false;
    }

    environment.setOutput("Extracted Data", JSON.stringify(result));

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
