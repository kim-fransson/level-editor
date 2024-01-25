import { Canvas } from "@/components";
import { forwardRef, ForwardedRef } from "react";

interface ContentAreaProps {}

export const ContentArea = forwardRef<HTMLDivElement, ContentAreaProps>(
  (_props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        className={`grid-in-content bg-white/87 flex justify-center items-center`}
        ref={ref}
      >
        <Canvas />
      </div>
    );
  },
);
