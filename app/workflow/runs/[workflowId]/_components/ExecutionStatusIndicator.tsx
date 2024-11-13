import { WorkflowExecutionStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

const indicatorsColors: Record<WorkflowExecutionStatus, string> = {
  COMPLETED: "bg-emerald-600",
  PENDING: "bg-slate-400",
  RUNNING: "bg-yellow-400",
  FAILED: "bg-red-400",
};

function ExecutionStatusIndicator({
  status,
}: {
  status: WorkflowExecutionStatus;
}) {
  return (
    <div
      className={cn(
        "w-2 h-2 rounded-full bg-red-600",
        indicatorsColors[status]
      )}
    />
  );
}

export default ExecutionStatusIndicator;
