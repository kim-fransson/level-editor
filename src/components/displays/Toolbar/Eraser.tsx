import { Tooltip } from "@/components";
import { ToggleButton, TooltipTrigger } from "react-aria-components";
import { useHotkeys } from "react-hotkeys-hook";

import RubberIcon from "@assets/icons/rubber-icon.svg?react";

import { useApp, useIsMac, useLevel } from "@/hooks";

export const Eraser = () => {
  const { updateCursor } = useApp();
  const { updateMode, paintedCells, mode } = useLevel();

  const onChange = (selected: boolean) => {
    if (selected) {
      updateCursor("/icons/eraser.svg");
      updateMode("erase");
    } else {
      updateCursor(undefined);
      updateMode("view");
    }
  };

  useHotkeys(["ctrl+e", "mod+e"], () => onChange(mode === "erase"));
  const isMac = useIsMac();
  return (
    <TooltipTrigger delay={300}>
      <ToggleButton
        isSelected={mode === "erase"}
        isDisabled={paintedCells.length === 0}
        onChange={onChange}
        className="outline-none hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white
          flex items-center justify-center p-2 rounded pressed:scale-90 focus-visible:ring-2 ring-yellow-400 selected:bg-blue
          pressed:bg-blue"
      >
        <RubberIcon />
      </ToggleButton>
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
