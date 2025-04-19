import { ExecutionEnvironment } from "@/lib/types";
import { NavigateUrlTask } from "../task/NavigateUrl";

export async function NavigateUrlExecutor(
  environment: ExecutionEnvironment<typeof NavigateUrlTask>
): Promise<boolean> {
  try {
    const url = environment.getInput("Url");
    if (!url) {
      environment.log.error("input -> Url is not defined");
      return false;
    }

    await environment.getPage()!.goto(url);
    environment.log.info(`Visited ${url}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
