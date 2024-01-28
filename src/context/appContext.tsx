import { PropsWithChildren, createContext, useMemo, useState } from "react";

export const AppContext = createContext<AppState | null>(null);

const AppProvider = ({ children }: PropsWithChildren) => {
  const [activeTile, setActiveTile] = useState<Tile>();
  const [cursor, setCursor] = useState<string>();
  const [zoomScale, setZoomScale] = useState<number>(100);

  const updateActiveTile = (tile?: Tile) => setActiveTile(tile);
  const updateCursor = (cursor?: string) => setCursor(cursor);
  const updateZoomScale = (scale: number) => setZoomScale(scale);

  const memoizedValue = useMemo(() => {
    return {
      activeTile,
      cursor,
      updateActiveTile,
      updateCursor,
      zoomScale,
      updateZoomScale,
    };
  }, [activeTile, cursor, zoomScale]);

  return (
    <AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
