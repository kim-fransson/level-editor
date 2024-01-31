import { grid, paintedCells } from "@/data/level";
import { generateCellsArray } from "@/utils";

export const initialState: LevelState = {
  grid: grid,
  mode: "view",
  paintedCells: paintedCells,
  paint: () => {},
  updateMode: () => {},
  erase: () => {},
  undoPaint: () => {},
  updateGridSize: () => {},
};

export const levelReducer = (state: LevelState, action: LevelAction) => {
  const { grid, paintedCells } = state;

  switch (action.type) {
    case "INIT_STORED_STATE": {
      return action.value;
    }

    case "PAINT": {
      const { cell, img } = action;

      if (!img || cell.images.includes(img)) {
        return state;
      }

      const { row, col } = cell.coordinates;
      const updatedGrid = grid.map((rowArray) => [...rowArray]);

      const updatedCell: Cell = {
        ...updatedGrid[row][col],
        images: [...cell.images, img],
      };

      updatedGrid[row][col] = updatedCell;

      return {
        ...state,
        grid: updatedGrid,
        paintedCells: [...paintedCells, updatedCell],
      };
    }

    case "UPDATE_MODE": {
      return { ...state, mode: action.mode };
    }

    case "UNDO_PAINT": {
      const updatedPaintedCells = [...paintedCells];
      const cell = updatedPaintedCells.pop();

      if (!cell) {
        return state;
      }

      const updatedImages = [...cell.images];
      updatedImages.pop();

      const { row, col } = cell.coordinates;
      const updatedGrid = grid.map((rowArray) => [...rowArray]);
      const updatedCell: Cell = {
        ...updatedGrid[row][col],
        images: updatedImages,
      };

      updatedGrid[row][col] = updatedCell;

      return { ...state, grid: updatedGrid, paintedCells: updatedPaintedCells };
    }

    case "ERASE": {
      const { cell } = action;

      if (!paintedCells.find((c) => c.id === cell.id)) {
        return state;
      }

      const { row, col } = cell.coordinates;
      const updatedGrid = grid.map((rowArray) => [...rowArray]);

      const updatedCell: Cell = {
        ...updatedGrid[row][col],
        images: [],
      };

      updatedGrid[row][col] = updatedCell;

      return {
        ...state,
        grid: updatedGrid,
        paintedCells: paintedCells.filter((c) => c.id !== updatedCell.id),
      };
    }

    case "UPDATE_GRID_SIZE": {
      const { rows, cols } = action;
      return {
        ...state,
        grid: generateCellsArray(rows, cols),
        paintedCells: [],
      };
    }
  }
};
