import { Circle, Text, Group } from "react-konva";

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
  const radius = (50 / 1200) * stageWidth; // Node size scales with canvas
  const fontSize = (16 / 1200) * stageWidth; // Label font size scales too
  const posX = x ?? stageWidth / 2;
  const posY = y ?? stageHeight / 2;

  return (
    <Group
      x={posX}
      y={posY}
      onClick={onClick}
      onMouseEnter={(e) => {
        const stage = e.target.getStage();
        if (stage) stage.container().style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        const stage = e.target.getStage();
        if (stage) stage.container().style.cursor = "default";
      }}
    >
      {/* Node circle */}
      <Circle
        radius={radius}
        fill={node.color}
        shadowBlur={8}
        shadowColor="#00000040"
      />

      {/* Optional emoji centered */}
      {node.emoji && (
        <Text
          text={node.emoji}
          fontSize={radius}
          offsetX={radius / 2}
          offsetY={radius / 2}
        />
      )}

      {/* Label below the circle */}
      <Text
        text={node.label}
        fontSize={fontSize}
        fill="white"
        align="center"
        x={-radius}
        y={radius + 6} // 6px spacing below circle
        width={radius * 2} // center the text below the node
      />
    </Group>
  );
};

export default Node;
