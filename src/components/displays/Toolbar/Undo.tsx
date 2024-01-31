import { Tooltip } from "@/components";
import { Button, TooltipTrigger } from "react-aria-components";
import { useHotkeys } from "react-hotkeys-hook";

import UndoIcon from "@assets/icons/undo-icon.svg?react";
import { useIsMac, useLevel } from "@/hooks";

export const Undo = () => {
  const { undoPaint, paintedCells } = useLevel();
  useHotkeys(["ctrl+z", "mod+z"], () => undoPaint());
  const isMac = useIsMac();
  return (
    <TooltipTrigger delay={300}>
      <Button
        isDisabled={paintedCells.length === 0}
        onPress={undoPaint}
        className="outline-none hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white
      flex items-center justify-center p-2 focus-visible:ring-2 ring-yellow-400 rounded pressed:scale-90 pressed:bg-blue"
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
