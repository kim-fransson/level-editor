import { Canvas } from "@/components";
import { useApp } from "@/hooks";
import { forwardRef, ForwardedRef } from "react";

interface ContentAreaProps {}

export const ContentArea = forwardRef<HTMLDivElement, ContentAreaProps>(
  (_props, ref: ForwardedRef<HTMLDivElement>) => {
    const { zoomScale } = useApp();
    return (
      <div className={`grid-in-content overflow-hidden`} ref={ref}>
        <div className="bg-white/87 w-full h-full flex justify-center items-center overflow-auto">
          <div style={{ transform: `scale(${zoomScale / 100})` }}>
            <Canvas />
          </div>
        </div>
      </div>
    );
  },
);
