import { Tooltip } from "@/components";
import { Button, TooltipTrigger } from "react-aria-components";

import UndoIcon from "@assets/icons/undo-icon.svg?react";
import { useCells } from "@/hooks";

export const Undo = () => {
  const { undoPaint, paintedCells } = useCells();
  return (
    <TooltipTrigger delay={300}>
      <Button
        isDisabled={paintedCells.length === 0}
        onPress={undoPaint}
        className="outline-none hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white
      flex items-center justify-center p-2 focus:bg-blue rounded pressed:scale-90"
      >
        <UndoIcon />
      </Button>
      <Tooltip>Undo</Tooltip>
    </TooltipTrigger>
  );
};
