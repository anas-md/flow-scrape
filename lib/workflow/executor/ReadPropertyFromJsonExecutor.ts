import { ExecutionEnvironment } from "@/lib/types";
import { ReadPropertyFromJsonTask } from "../task/ReadPropertyFromJson";

export async function ReadPropertyFromJsonExecutor(
  environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>
): Promise<boolean> {
  try {
    let jsonData = environment.getInput("JSON");
    if (!jsonData) {
      environment.log.error("input -> JSON is not defined");
      return false;
    }
    const propertyName = environment.getInput("Property name");

    if (!propertyName) {
      environment.log.error("input -> Property is not defined");
      return false;
    }
    const json = JSON.parse(jsonData);

    const propertValue = json[propertyName];

    if (!propertValue) {
      environment.log.error("Property not found");
      return false;
    }

    environment.setOutput("Property Value", propertValue);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
