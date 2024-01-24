export const generateGridList = (rows: number, columns: number) => {
  return Array.from({ length: rows * columns }, (_, index) => ({
    id: index + 1,
  }));
};
