import { Tooltip } from "@/components";
import { Button, TooltipTrigger } from "react-aria-components";
import { useHotkeys } from "react-hotkeys-hook";

import UndoIcon from "@assets/icons/undo-icon.svg?react";
import { useCells } from "@/hooks";
import useIsMac from "@/hooks/useIsMac";

export const Undo = () => {
  const { undoPaint, paintedCells } = useCells();
  useHotkeys(["ctrl+z", "mod+z"], () => undoPaint());
  const isMac = useIsMac();
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
      <Tooltip>
        Undo
        <span className="flex gap-1 text-dark-gray">
          {isMac ? (
            <>
              <kbd className="kbd kbd-sm">⌘</kbd>
              <kbd className="kbd kbd-sm">z</kbd>
            </>
          ) : (
            <>
              <kbd className="kbd kbd-sm">Ctrl</kbd>
              <kbd className="kbd kbd-sm">z</kbd>
            </>
          )}
        </span>
      </Tooltip>
    </TooltipTrigger>
  );
};
