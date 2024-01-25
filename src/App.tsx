import { useRef } from "react";
import { useApp, useCursor } from "./hooks";
import {
  TilesSidebar,
  ContentArea,
  Footer,
  NotSupported,
  Toolbar,
} from "./components";
import CellsProvider from "./context/cellsContext";

export default function App() {
  const contentAreaRef = useRef(null);
  const { cursor } = useApp();
  useCursor(cursor, contentAreaRef);

  return (
    <CellsProvider>
      <div className="h-dvh grid-areas-layout grid-cols-layout grid-rows-layout hidden md:grid">
        <TilesSidebar />
        <ContentArea ref={contentAreaRef} />
        <Toolbar />
        <Footer />
      </div>
      <NotSupported />
    </CellsProvider>
  );
}
