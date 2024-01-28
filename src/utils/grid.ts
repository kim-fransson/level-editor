export const generateGridList = (rows: number, columns: number) => {
  return Array.from({ length: rows * columns }, (_, index) => ({
    id: index,
  }));
};

export const exportCanvas = (
  rows: number,
  cols: number,
  paintedCells: Cell[],
) => {
  const gridArray = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null),
  ) as (number | null)[][];

  paintedCells.forEach((cell) => {
    const { id, tile } = cell;
    const { id: tileId } = tile || {};

    if (id !== undefined && tileId !== undefined) {
      const row = Math.floor(id / cols);
      const col = id % cols;

      gridArray[row][col] = tileId;
    }
  });

  return gridArray;
};
