import { ExecutionEnviornment } from "@/lib/types";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(
  enviornment: ExecutionEnviornment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = enviornment.getInput("Website Url");
    console.log(websiteUrl);

    const browser = await puppeteer.launch({
      headless: true, // For dev_testing
    });
    enviornment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    enviornment.setPage(page);
    return true;
  } catch (error) {
    console.log("🔴LAUNCH_BROWSER_EXECUTOR_ERROR🔴");
    console.log(error);
    return false;
  }
}
