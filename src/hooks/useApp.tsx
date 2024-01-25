import { AppContext } from "@/context/appContext";
import { useContext } from "react";

export const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined || context === null) {
    throw new Error("useApp was used outside of its Provider");
  }

  return context;
};
