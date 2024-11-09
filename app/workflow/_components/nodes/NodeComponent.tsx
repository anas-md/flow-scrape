import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/lib/types";
import { TaskRegistry } from "@/lib/workflow/task/Registry";
import NodeInput from "./NodeInput";
import NodeOutput from "./params/NodeOutput";
import NodeIO from "./NodeIO";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeIO>
        {task.inputs.map((input) => (
          <NodeInput input={input} key={input.name} nodeId={props.id} />
        ))}
      </NodeIO>
      <NodeIO>
        {task.outputs.map((output) => (
          <NodeOutput output={output} key={output.name} />
        ))}
      </NodeIO>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
