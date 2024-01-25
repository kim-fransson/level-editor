import { CellsContext } from "@/context/cellsContext";
import { useContext } from "react";

export const useCells = () => {
  const context = useContext(CellsContext);

  if (context === undefined || context === null) {
    throw new Error("useCells was used outside of its Provider");
  }

  return context;
};
