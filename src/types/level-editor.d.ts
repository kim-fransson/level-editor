type Tile = {
  id: number;
  src: string;
};

type Cell = {
  id: number;
  tile?: Tile;
};
