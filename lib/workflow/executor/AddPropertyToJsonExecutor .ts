import { ExecutionEnvironment } from "@/lib/types";
import { AddPropertyToJsonTask } from "../task/AddPropertyToJson";

export async function AddPropertyToJsonExecutor(
  environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>
): Promise<boolean> {
  try {
    const jsonData = environment.getInput("JSON");
    if (!jsonData) {
      environment.log.error("input -> JSON is not defined");
      return false;
    }
    const propertyName = environment.getInput("Property name");

    if (!propertyName) {
      environment.log.error("input -> Property Name is not defined");
      return false;
    }

    const propertyValue = environment.getInput("Property value");

    if (!propertyValue) {
      environment.log.error("input -> Propety Value is not defined");
      return false;
    }

    const json = JSON.parse(jsonData);
    json[propertyName] = propertyValue;

    environment.setOutput("Updated JSON", JSON.stringify(json));

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
