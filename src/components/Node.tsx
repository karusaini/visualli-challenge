/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group, Circle, Text } from "react-konva";

interface NodeProps {
  node: {
    id: string;
    label: string;
    color: string;
    children: string[];
    emoji?: string;
  };
  stageWidth: number;
  stageHeight: number;
  onClick: () => void;
  x?: number;
  y?: number;
}

const Node = ({ node, stageWidth, stageHeight, onClick, x, y }: NodeProps) => {
  const radius = (50 / 1200) * stageWidth;
  const fontSize = (16 / 1200) * stageWidth;
  const posX = x ?? stageWidth / 2;
  const posY = y ?? stageHeight / 2;

  return (
    <Group
      {...({ x: posX, y: posY, onClick } as any)} // TS-safe
      onMouseEnter={(e) => {
        const stage = e.target.getStage();
        if (stage) stage.container().style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        const stage = e.target.getStage();
        if (stage) stage.container().style.cursor = "default";
      }}
    >
      <Circle
        radius={radius}
        fill={node.color}
        shadowBlur={8}
        shadowColor="#00000040"
      />

      {node.emoji && (
        <Text
          text={node.emoji}
          fontSize={radius}
          offsetX={radius / 2}
          offsetY={radius / 2}
        />
      )}

      <Text
        text={node.label}
        fontSize={fontSize}
        fill="white"
        align="center"
        x={-radius}
        y={radius + 6}
        width={radius * 2}
      />
    </Group>
  );
};

export default Node;
