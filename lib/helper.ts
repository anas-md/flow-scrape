import { ExecutionPhase } from "@prisma/client";
import { intervalToDuration } from "date-fns";
import { AppNode } from "./types";
import { TaskRegistry } from "./workflow/task/Registry";

export function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function datesToDurationString(
  end: Date | null | undefined,
  start: Date | null | undefined
) {
  if (!start || !end) return null;

  const timeElapsed = end.getTime() - start.getTime();
  if (timeElapsed < 1000) {
    return `${timeElapsed} ms`;
  }

  // intervalToDuration does not account for values under one second
  const duration = intervalToDuration({
    start: 0,
    end: timeElapsed,
  });

  return `${duration.hours || 0}h ${duration.minutes || 0}m ${
    duration.seconds || 0
  }s`;
}

type Phase = Pick<ExecutionPhase, "creditsConsumed">;
export function getPhasesTotalCost(phases: Phase[]) {
  return phases.reduce((acc, phase) => acc + (phase.creditsConsumed || 0), 0);
}

export function calculateWorkflowCost(nodes: AppNode[]) {
  return nodes.reduce((acc, node) => {
    return acc + TaskRegistry[node.data.type].credits;
  }, 0);
}
