import { ExecutionEnvironment } from "@/lib/types";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

const proxyUsername = process.env.PROXY_USERNAME!;
const proxyPassword = process.env.PROXY_PASSWORD!;
const proxyServer = process.env.PROXY_SERVER!;

if (!proxyUsername || !proxyPassword || !proxyServer) {
  throw new Error("Proxy credentials or server not configured in environment variables.");
}

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");
    console.log(websiteUrl);

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        `--proxy-server=${proxyServer}`
      ]
    });

    environment.log.info("Browser started successfully");
    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.authenticate({
      username: proxyUsername,
      password: proxyPassword
    });
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    // TODO: Consider re-throwing or handling the error more specifically
    // if proxy setup fails due to missing env vars.
    return false;
  }
}
