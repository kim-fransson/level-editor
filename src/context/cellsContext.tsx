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
  const [paintMode, setPaintMode] = useState<PaintMode>("view");
  const [columns, setColumns] = useState(15);
  const [rows, setRows] = useState(15);

  const updatePaintedCells = (cells: Cell[]) => setPaintedCells(cells);
  const updatePaintMode = (mode: PaintMode) => setPaintMode(mode);
  const updateColumns = (cols: number) => setColumns(cols);
  const updateRows = (rows: number) => setRows(rows);

  const undoPaint = useCallback(() => {
    if (paintedCells.length > 0) {
      const temp = [...paintedCells];
      temp.pop();
      setPaintedCells(temp);
    }
  }, [paintedCells, setPaintedCells]);

  const memoizedValue = useMemo(() => {
    return {
      paintedCells,
      updatePaintedCells,
      undoPaint,
      paintMode,
      updatePaintMode,
      columns,
      rows,
      updateColumns,
      updateRows,
    };
  }, [paintedCells, undoPaint, paintMode, columns, rows]);

  return (
    <CellsContext.Provider value={memoizedValue}>
      {children}
    </CellsContext.Provider>
  );
};

export default CellsProvider;
