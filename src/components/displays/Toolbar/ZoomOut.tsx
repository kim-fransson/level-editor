import { Tooltip } from "@/components";
import { Button, TooltipTrigger } from "react-aria-components";

import ZoomOutIcon from "@assets/icons/zoom-out-icon.svg?react";

import { useApp } from "@/hooks";

export const ZoomOut = () => {
  const { zoomScale, updateZoomScale } = useApp();

  const onZoomOut = () => {
    if (zoomScale !== 50) {
      updateZoomScale(zoomScale - 10);
    }
  };

  return (
    <TooltipTrigger delay={300}>
      <Button
        isDisabled={zoomScale === 50}
        onPress={onZoomOut}
        className="outline-none hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white
          flex items-center justify-center p-2  rounded pressed:scale-90 focus:bg-blue"
      >
        <ZoomOutIcon />
      </Button>
      <Tooltip>Zoom out</Tooltip>
    </TooltipTrigger>
  );
};
