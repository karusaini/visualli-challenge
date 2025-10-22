import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Canvas from "./components/Canvas";
import UIControls from "./components/UIControls";
import layersData from "./data/layers.json";
import { layerGradients } from "./data/layerGradients";

function App() {
  const [currentLayerId, setCurrentLayerId] = useState(layersData.layers[0].id);
  const [layerHistory, setLayerHistory] = useState<string[]>([currentLayerId]);
  const [animating, setAnimating] = useState(false);

  const handleZoomIn = (childLayerId: string) => {
    if (animating) return;
    setAnimating(true);
    setLayerHistory([...layerHistory, childLayerId]);
    setTimeout(() => {
      setCurrentLayerId(childLayerId);
      setAnimating(false);
    }, 500);
  };

  const handleZoomOut = () => {
    if (animating || layerHistory.length <= 1) return;
    setAnimating(true);
    const prevHistory = layerHistory.slice(0, -1);
    setTimeout(() => {
      setLayerHistory(prevHistory);
      setCurrentLayerId(prevHistory[prevHistory.length - 1]);
      setAnimating(false);
    }, 500);
  };

  const goHome = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setLayerHistory([layersData.layers[0].id]);
      setCurrentLayerId(layersData.layers[0].id);
      setAnimating(false);
    }, 500);
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center transition-all duration-500"
      style={{ background: layerGradients[currentLayerId] || "#ffffff" }}
    >
      <UIControls layerHistory={layerHistory} goHome={goHome} />
      <AnimatePresence mode="wait">
        <Canvas
          key={currentLayerId}
          layerData={layersData.layers.find((l) => l.id === currentLayerId)!}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
        />
      </AnimatePresence>
    </div>
  );
}

export default App;
