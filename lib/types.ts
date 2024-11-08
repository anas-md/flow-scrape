import { Node } from "@xyflow/react";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
}

export interface AppNodeData {
  [key: string]: any;
  type: TaskType;
  inputs: Record<string, string>;
}

export interface AppNode extends Node {
  data: AppNodeData;
}
