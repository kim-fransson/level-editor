type Tile = {
  id: number;
  src: string;
};

type Cell = {
  id: number;
  tile?: Tile;
};

type AppState = {
  cursor?: string;
  updateCursor: (cursor?: string) => void;
  activeTile?: Tile;
  updateActiveTile: (tile?: Tile) => void;
};
