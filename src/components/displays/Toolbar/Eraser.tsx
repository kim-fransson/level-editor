import { Tooltip } from "@/components";
import { Button, TooltipTrigger } from "react-aria-components";
import { useHotkeys } from "react-hotkeys-hook";

import RubberIcon from "@assets/icons/rubber-icon.svg?react";

import { useApp, useIsMac, useLevel } from "@/hooks";
import { twMerge } from "tailwind-merge";

export const Eraser = () => {
  const { updateCursor } = useApp();
  const { updateMode, mode, paintedCells } = useLevel();

  const onPress = () => {
    if (paintedCells.length !== 0) {
      updateCursor("/icons/eraser.svg");
      updateMode("erase");
    }
  };

  useHotkeys(["ctrl+e", "mod+e"], () => onPress());
  const isMac = useIsMac();
  return (
    <TooltipTrigger delay={300}>
      <Button
        isDisabled={paintedCells.length === 0}
        onPress={onPress}
        className={twMerge(
          "outline-none hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white",
          "flex items-center justify-center p-2  rounded pressed:scale-90",
          mode === "erase" ? "bg-blue" : "focus:bg-blue",
        )}
      >
        <RubberIcon />
      </Button>
      <Tooltip>
        Erase
        <span className="flex gap-1 text-dark-gray">
          {isMac ? (
            <>
              <kbd className="kbd kbd-sm">⌘</kbd>
              <kbd className="kbd kbd-sm">e</kbd>
            </>
          ) : (
            <>
              <kbd className="kbd kbd-sm">Ctrl</kbd>
              <kbd className="kbd kbd-sm">e</kbd>
            </>
          )}
        </span>
      </Tooltip>
    </TooltipTrigger>
  );
};
