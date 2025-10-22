import React from "react";

interface UIControlsProps {
  layerHistory: string[];
  goHome: () => void;
  onSelectLayer?: (layerId: string) => void;
}

const UIControls = ({
  layerHistory,
  goHome,
  onSelectLayer,
}: UIControlsProps) => {
  return (
    <div className="fixed top-4 left-4 flex flex-col items-center space-y-4 z-50">
      {/* Home Button */}
      <button
        onClick={goHome}
        className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center shadow-lg hover:bg-yellow-500 transition"
      >
        🏠
      </button>

      {/* Layer bubbles */}
      {layerHistory.map((layerId, idx) => (
        <button
          key={idx}
          onClick={() => onSelectLayer?.(layerId)}
          className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center shadow-md hover:bg-blue-500 transition text-sm"
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};

export default UIControls;
