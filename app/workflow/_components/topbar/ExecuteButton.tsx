"use client";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { PlayIcon } from "lucide-react";
import React from "react";

function ExecuteButton({ workflowId }: { workflowId: string }) {
  const generateExecutionPlan = useExecutionPlan();

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generateExecutionPlan();
        console.log("--- plan---");
        console.table(plan);
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" /> Execute
    </Button>
  );
}

export default ExecuteButton;
