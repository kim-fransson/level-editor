import { useRef } from "react";
import { useApp, useCursor } from "./hooks";
import {
  TilesSidebar,
  ContentArea,
  Footer,
  NotSupported,
  Toolbar,
} from "./components";
import { LevelProvider } from "./context/LevelContext";

// todo: A way to isolate hotkeys?
// todo: overflow issue
export default function App() {
  const contentAreaRef = useRef(null);
  const { cursor } = useApp();
  useCursor(cursor, contentAreaRef);

  return (
    <LevelProvider>
      <div className="h-dvh grid-areas-layout grid-cols-layout grid-rows-layout hidden md:grid">
        <TilesSidebar />
        <ContentArea ref={contentAreaRef} />
        <Toolbar />
        <Footer />
      </div>
      <NotSupported />
    </LevelProvider>
  );
}
