import { PropsWithChildren, createContext, useMemo, useState } from "react";

export const AppContext = createContext<AppState | null>(null);

const AppProvider = ({ children }: PropsWithChildren) => {
  const [activeTile, setActiveTile] = useState<Tile>();
  const [cursor, setCursor] = useState<string>();

  const updateActiveTile = (tile?: Tile) => setActiveTile(tile);
  const updateCursor = (cursor?: string) => setCursor(cursor);

  const memoizedValue = useMemo(() => {
    return { activeTile, cursor, updateActiveTile, updateCursor };
  }, [activeTile, cursor]);

  return (
    <AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
