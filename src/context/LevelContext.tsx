import { initialState, levelReducer } from "@/reducers/levelReducer";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export const LevelContext = createContext(initialState);

export const LevelProvider = ({ children }: PropsWithChildren) => {
  const [persistentState, setPersistentState] = useLocalStorage(
    "state",
    initialState,
  );
  const [state, dispatch] = useReducer(levelReducer, persistentState);

  useEffect(() => {
    setPersistentState({ ...state, mode: "view" });
  }, [setPersistentState, state]);

  const paint = (cell: Cell, img?: string) => {
    if (img) {
      dispatch({
        type: "PAINT",
        cell,
        img,
      });
    }
  };

  const undoPaint = () => {
    dispatch({
      type: "UNDO_PAINT",
    });
  };

  const erase = (cell: Cell) => {
    dispatch({
      type: "ERASE",
      cell,
    });
  };

  const updateMode = (mode: Mode) => {
    dispatch({
      type: "UPDATE_MODE",
      mode,
    });
  };

  const updateGridSize = (rows: number, cols: number) => {
    dispatch({
      type: "UPDATE_GRID_SIZE",
      rows,
      cols,
    });
  };

  const memoizedValue = useMemo(() => {
    return {
      ...state,
      paint,
      updateMode,
      erase,
      undoPaint,
      updateGridSize,
    };
  }, [state]);

  return (
    <LevelContext.Provider value={memoizedValue}>
      {children}
    </LevelContext.Provider>
  );
};
