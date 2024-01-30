import { Canvas } from "@/components";
import { useApp, usePress } from "@/hooks";
import { forwardRef, ForwardedRef, createContext } from "react";

interface ContentAreaProps {}

export const PressingContext = createContext(false);

export const ContentArea = forwardRef<HTMLDivElement, ContentAreaProps>(
  (_props, ref: ForwardedRef<HTMLDivElement>) => {
    const { zoomScale } = useApp();
    const [pressAreaRef, isPressing] = usePress();
    return (
      <div className={`grid-in-content overflow-hidden`} ref={ref}>
        <div className="bg-white/87 w-full h-full flex justify-center items-center overflow-auto">
          <PressingContext.Provider value={isPressing}>
            <div
              ref={pressAreaRef}
              style={{ transform: `scale(${zoomScale / 100})` }}
            >
              <Canvas />
            </div>
          </PressingContext.Provider>
        </div>
      </div>
    );
  },
);
