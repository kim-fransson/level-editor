import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

export const CellsContext = createContext<CellsState | null>(null);

const CellsProvider = ({ children }: PropsWithChildren) => {
  const [paintedCells, setPaintedCells] = useState<Cell[]>([]);

  const updatePaintedCells = (cells: Cell[]) => setPaintedCells(cells);

  const undoPaint = useCallback(() => {
    if (paintedCells.length > 0) {
      const temp = [...paintedCells];
      temp.pop();
      setPaintedCells(temp);
    }
  }, [paintedCells, setPaintedCells]);

  const memoizedValue = useMemo(() => {
    return { paintedCells, updatePaintedCells, undoPaint };
  }, [paintedCells, undoPaint]);

  return (
    <CellsContext.Provider value={memoizedValue}>
      {children}
    </CellsContext.Provider>
  );
};

export default CellsProvider;
