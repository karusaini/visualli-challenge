interface UIProps {
  layerHistory: string[];
  goHome: () => void;
}

const UIControls = ({ layerHistory, goHome }: UIProps) => {
  return (
    <div className="absolute top-4 left-4 flex flex-col items-start space-y-2">
      <button
        onClick={goHome}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        🏠 Home
      </button>
      <div className="flex flex-col mt-2 space-y-1">
        {layerHistory.map((layerId, idx) => (
          <button
            key={idx}
            className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition text-sm"
          >
            {layerId}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UIControls;
