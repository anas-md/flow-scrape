import { ExecutionEnviornment } from "@/lib/types";
import * as cheerio from "cheerio";
import { ExtractTextFromElementTask } from "../task/ExtractTextFromElement";

export async function ExtractTextFromElement(
  enviornment: ExecutionEnviornment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = enviornment.getInput("Selector");
    if (!selector) {
      console.error("Selector not defined");
      return false;
    }

    const html = enviornment.getInput("Html");
    if (!html) {
      console.error("HTML not defined");
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      console.error("Element not found on selector");
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      console.error("Element has no text");
      return false;
    }

    enviornment.setOutput("Extracted Text", extractedText);

    return true;
  } catch (error) {
    console.log("🔴EXTRACT_TEXT_FROM_ELEMENT_EXECUTOR_ERROR🔴");
    console.log(error);
    return false;
  }
}
