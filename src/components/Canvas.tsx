/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Stage, Layer } from "react-konva";
import Node from "./Node";
import { useState, useEffect, useRef } from "react";
import { useGesture } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

interface NodeData {
  id: string;
  label: string;
  color: string;
  children: string[];
  emoji?: string;
}

interface LayerData {
  id: string;
  nodes: NodeData[];
}

interface CanvasProps {
  layerData: LayerData;
  handleZoomIn: (childLayerId: string) => void;
  handleZoomOut?: () => void;
}

function computeCirclePositions(
  n: number,
  radius: number,
  centerX: number,
  centerY: number
) {
  const positions = [];
  const angleStep = (2 * Math.PI) / n;
  for (let i = 0; i < n; i++) {
    const angle = i * angleStep;
    positions.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  }
  return positions;
}

const Canvas = ({ layerData, handleZoomIn, handleZoomOut }: CanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth * 0.9,
    height: window.innerHeight * 0.8,
  });

  const [springProps, api] = useSpring(() => ({ scale: 1, x: 0, y: 0 }));

  useEffect(() => {
    const handleResize = () =>
      setStageSize({
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.8,
      });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGesture(
    {
      onPinch: ({ offset: [d] }) => api.start({ scale: 1 + d / 200 }),
      onDrag: ({ offset: [x, y] }) => api.start({ x, y }),
    },
    { target: containerRef, eventOptions: { passive: false } }
  );

  const centerX = stageSize.width / 2;
  const centerY = stageSize.height / 2;
  const circleRadius = Math.min(stageSize.width, stageSize.height) / 3;
  const nodePositions = computeCirclePositions(
    layerData.nodes.length,
    circleRadius,
    centerX,
    centerY
  );

  const onRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleZoomOut?.();
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    layerData.nodes.forEach((node, idx) => {
      const dx = mouseX - nodePositions[idx].x;
      const dy = mouseY - nodePositions[idx].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const nodeRadius = (50 / 1200) * stageSize.width;

      if (distance <= nodeRadius) {
        if (e.deltaY < 0) {
          node.children.length && handleZoomIn(node.children[0]);
        } else if (e.deltaY > 0) {
          handleZoomOut?.();
        }
      }
    });
  };

  return (
    <div
      ref={containerRef}
      onContextMenu={onRightClick}
      onWheel={onWheel}
      className="w-full h-full flex justify-center items-center"
    >
      <animated.div
        style={{
          scale: springProps.scale,
          x: springProps.x,
          y: springProps.y,
          width: "100%",
          height: "100%",
        }}
      >
        <Stage
          {...({ width: stageSize.width, height: stageSize.height } as any)}
        >
          <Layer {...({} as any)}>
            <Node
              node={{
                id: "center",
                label: "Water Cycle",
                color: "#FFD700",
                children: [],
                emoji: "🔄",
              }}
              stageWidth={stageSize.width}
              stageHeight={stageSize.height}
              onClick={() => {}}
              x={centerX}
              y={centerY}
            />

            {layerData.nodes.map((node, idx) => (
              <Node
                key={node.id}
                node={node}
                stageWidth={stageSize.width}
                stageHeight={stageSize.height}
                onClick={() =>
                  node.children.length && handleZoomIn(node.children[0])
                }
                x={nodePositions[idx].x}
                y={nodePositions[idx].y}
              />
            ))}
          </Layer>
        </Stage>
      </animated.div>
    </div>
  );
};

export default Canvas;
