import { useEffect, useRef, useState } from "react";
import { useCursor } from "./hooks";
import {
  TilesSidebar,
  ContentArea,
  Footer,
  NotSupported,
  Toolbar,
} from "./components";

export default function App() {
  const contentAreaRef = useRef(null);
  const [activeTile, setActiveTile] = useState<Tile>();
  useCursor(activeTile?.src, contentAreaRef);

  return (
    <>
      <div className="h-dvh grid-areas-layout grid-cols-layout grid-rows-layout hidden md:grid">
        <Toolbar />
        <TilesSidebar onSelectTile={setActiveTile} />
        <ContentArea ref={contentAreaRef} activeTile={activeTile} />
        <Footer />
      </div>
      <NotSupported />
    </>
  );
}
