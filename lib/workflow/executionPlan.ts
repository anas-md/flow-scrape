import { Edge, getIncomers } from "@xyflow/react";
import {
  AppNode,
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "../types";
import { TaskRegistry } from "./task/Registry";

type flowToExecutionPlan = {
  executionPlan?: WorkflowExecutionPlan;
};

export function flowToExecutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): flowToExecutionPlan {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );

  if (!entryPoint) {
    throw new Error("TODO: No Entry point");
  }

  const planned = new Set<string>();

  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  for (
    let phase = 2;
    phase <= nodes.length || planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        // Node is already planned for execution
        continue;
      }

      const invalidInputs = getInvalidInputs(currentNode, edges, planned);

      if (invalidInputs?.length > 0) {
        // If has invalid inputs i.e. Node input is blank, then cheking for if node has input from previous node
        const incomers = getIncomers(currentNode, nodes, edges);

        // Checking if the incomer node is already planned?
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          // If this hits it means all the incoming nodes are planned and thus the the current-node has invalid inputs
          console.log("Invalid Inputs", currentNode.id, invalidInputs);
          throw new Error("TODO: Invalid Inputs");
        } else {
          // Since all the incomers are not planned, skipping the check
          continue;
        }
      }

      // Here node is valid
      nextPhase.nodes.push(currentNode);
      planned.add(currentNode.id);
    }
  }

  return { executionPlan };
}

function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {
  const invalidInputs = [];

  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;

    if (inputValueProvided) {
      // This input has value entered by user
      continue;
    }

    // If value is not provided by user, then check if there is ouput link i.e. this input incoming data from other node

    // Checking all the incoming connections to the node
    const incomingEdges = edges.filter((edge) => edge.target === node.id);

    // Checking if input of the incomign node is connected to the current input
    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvidedbyVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    if (requiredInputProvidedbyVisitedOutput) {
      // The input is required and value is provided by the task that is already planned
      continue;
    } else if (!input.required) {
      // If the input is not required but there is output linked to it.

      // Then checking the output is already planned i.e the output doesn't depends on this input
      if (!inputLinkedToOutput) continue;

      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        // The output is providing a value to input.
        continue;
      }
    }
    invalidInputs.push(input.name);
  }
  return invalidInputs;
}
