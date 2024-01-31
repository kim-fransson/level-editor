import { initialState, levelReducer } from "@/reducers/levelReducer";
import {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export const LevelContext = createContext(initialState);

export const LevelProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(levelReducer, initialState);

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

  useEffect(() => {
    if (localStorage.getItem("state")) {
      dispatch({
        type: "INIT_STORED_STATE",
        value: JSON.parse(localStorage.getItem("state") as string),
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem("state", JSON.stringify({ ...state, mode: "view" }));
    }
  }, [state]);

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
