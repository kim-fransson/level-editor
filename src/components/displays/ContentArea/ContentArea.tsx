import { Canvas } from "@/components";
import { usePress } from "@/hooks";
import { forwardRef, ForwardedRef, createContext } from "react";

interface ContentAreaProps {}

export const PressingContext = createContext(false);

export const ContentArea = forwardRef<HTMLDivElement, ContentAreaProps>(
  (_props, ref: ForwardedRef<HTMLDivElement>) => {
    const [pressAreaRef, isPressing] = usePress();
    return (
      <div
        className={`grid-in-content grid bg-white/87 overflow-auto p-8`}
        ref={ref}
      >
        <PressingContext.Provider value={isPressing}>
          <div
            ref={pressAreaRef}
            className="flex-1 flex justify-center items-center"
          >
            <Canvas />
          </div>
        </PressingContext.Provider>
      </div>
    );
  },
);
