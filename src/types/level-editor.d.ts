type Tile = {
  id: number;
  src: string;
};

type Cell = {
  id: number;
  tile?: Tile;
  images: string[];
  coordinates: {
    row: number;
    col: number;
  };
};

type AppState = {
  cursor?: string;
  updateCursor: (cursor?: string) => void;
  activeTile?: Tile;
  updateActiveTile: (tile?: Tile) => void;
  zoomScale: number;
  updateZoomScale: (scale: number) => void;
};

type Mode = "paint" | "erase" | "view";

type LevelState = {
  grid: Cell[][];
  paintedCells: Cell[];
  mode: Mode;
  paint: (cell: Cell, img?: string) => void;
  erase: (cell: Cell) => void;
  updateMode: (mode: Mode) => void;
  undoPaint: () => void;
  updateGridSize: (rows: number, cols: number) => void;
};

type LevelAction =
  | Paint
  | UpdateMode
  | Erase
  | UndoPaint
  | UpdateGridSize
  | InitStoredState;

type InitStoredState = {
  type: "INIT_STORED_STATE";
  value: LevelState;
};

type Paint = {
  type: "PAINT";
  cell: Cell;
  img: string;
};

type Erase = {
  type: "ERASE";
  cell: Cell;
};

type UpdateMode = {
  type: "UPDATE_MODE";
  mode: Mode;
};

type UndoPaint = {
  type: "UNDO_PAINT";
};

type UpdateGridSize = {
  type: "UPDATE_GRID_SIZE";
  rows: number;
  cols: number;
};
