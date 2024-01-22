export const generateGrid = (rows: number, columns: number) => {
  const grid = [];

  for (let i = 0; i < rows; i++) {
    const row = Array(columns).fill(null);
    grid.push(row);
  }

  return grid;
};
