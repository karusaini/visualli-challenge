import { Stage, Layer } from "react-konva";
import { motion } from "framer-motion";
import Node from "./Node";
import { useState, useEffect, useRef } from "react";
import { useGesture } from "@use-gesture/react";
import { useSpring, animated } from "react-spring";

interface NodeData {
  id: string;
  label: string;
  color: string;
  children: string[];
}

interface LayerData {
  id: string;
  nodes: NodeData[];
}

interface CanvasProps {
  layerData: LayerData;
  handleZoomIn: (childLayerId: string) => void;
  handleZoomOut: () => void;
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

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex justify-center items-center"
    >
      <animated.div
        style={{ scale: springProps.scale, x: springProps.x, y: springProps.y }}
      >
        <Stage width={stageSize.width} height={stageSize.height}>
          <Layer>
            {/* Central node */}
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

            {/* Circular nodes */}
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
    </motion.div>
  );
};

export default Canvas;
