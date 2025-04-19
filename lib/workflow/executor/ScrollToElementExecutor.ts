import { ExecutionEnvironment } from "@/lib/types";
import { ScrollToElementTask } from "../task/ScrollToElement";

export async function ScrollToElementExecutor(
  environment: ExecutionEnvironment<typeof ScrollToElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input -> selector is not defined");
      return false;
    }

    await environment.getPage()!.evaluate((eleSelector) => {
      const element = document.querySelector(eleSelector);
      if (!element) {
        throw new Error("Element not found");
      }
      const eleScroll = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: eleScroll });
    }, selector);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
