import { TaskParamType, TaskType, WorkflowTask } from "@/lib/types";
import { BrainIcon, LucideProps } from "lucide-react";

export const LoginWithAiTask = {
  type: TaskType.LOGIN_WITH_AI,
  label: "Login with AI",
  icon: (props: LucideProps) => (
    <BrainIcon className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  credits: 3,
  inputs: [
    {
      name: "Content",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Credentials",
      type: TaskParamType.CREDENTIAL,
      required: true,
    },
    {
      name: "Prompt",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
  ] as const,
  outputs: [
    {
      name: "Extracted Data",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
