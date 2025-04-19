import { ExecutionEnvironment } from "@/lib/types";
import { DeliverViaWebHookTask } from "../task/DeliverViaWebHook";

export async function DeliverViaWebHookExecutor(
  environment: ExecutionEnvironment<typeof DeliverViaWebHookTask>
): Promise<boolean> {
  try {
    const targetUrl = environment.getInput("Target url");
    if (!targetUrl) {
      environment.log.error("input -> targetUrl is not defined");
      return false;
    }
    const body = environment.getInput("Body");
    if (!body) {
      environment.log.error("input -> Body is not defined");
      return false;
    }

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const resStatus = res.status;

    if (resStatus !== 200) {
      environment.log.error(`Status Code ${resStatus}`);
      return false;
    }

    const resBody = await res.json();
    environment.log.info(JSON.stringify(resBody, null, 4));

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
