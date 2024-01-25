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
};

type CellsState = {
  paintedCells: Cell[];
  updatePaintedCells: (cells: Cell[]) => void;
  undoPaint: () => void;
};
