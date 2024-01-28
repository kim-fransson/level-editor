import { Tooltip } from "@/components";
import { Button, TooltipTrigger } from "react-aria-components";

import ZoomInIcon from "@assets/icons/zoom-in-icon.svg?react";

import { useApp } from "@/hooks";

export const ZoomIn = () => {
  const { zoomScale, updateZoomScale } = useApp();

  const onZoomIn = () => {
    if (zoomScale !== 150) {
      updateZoomScale(zoomScale + 10);
    }
  };

  return (
    <TooltipTrigger delay={300}>
      <Button
        isDisabled={zoomScale === 150}
        onPress={onZoomIn}
        className="outline-none hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white
          flex items-center justify-center p-2  rounded pressed:scale-90 focus:bg-blue"
      >
        <ZoomInIcon />
      </Button>
      <Tooltip>Zoom in</Tooltip>
    </TooltipTrigger>
  );
};
