import { LevelContext } from "@/context/LevelContext";
import { useContext } from "react";

export const useLevel = () => {
  const context = useContext(LevelContext);

  if (context === undefined || context === null) {
    throw new Error("useLevel was used outside of its Provider");
  }

  return context;
};
