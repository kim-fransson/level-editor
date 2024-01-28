type Tile = {
  id: number;
  src: string;
};

type Cell = {
  id: number;
  tile?: Tile;
  order?: number;
};

type AppState = {
  cursor?: string;
  updateCursor: (cursor?: string) => void;
  activeTile?: Tile;
  updateActiveTile: (tile?: Tile) => void;
  zoomScale: number;
  updateZoomScale: (scale: number) => void;
};

type PaintMode = "paint" | "erase" | "view";

type CellsState = {
  paintedCells: Cell[];
  updatePaintedCells: (cells: Cell[]) => void;
  undoPaint: () => void;
  paintMode: PaintMode;
  updatePaintMode: (paintMode: PaintMode) => void;
};
