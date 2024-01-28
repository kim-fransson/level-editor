import { Tooltip } from "@/components";
import { tiles } from "@/data/tiles";
import { useApp, useCells, useIsMac } from "@/hooks";
import { Button, TooltipTrigger } from "react-aria-components";
import { useHotkeys } from "react-hotkeys-hook";

const defaultTile = tiles[0];

export const QuickAsset = () => {
  const { activeTile, updateCursor, updateActiveTile } = useApp();
  const { updatePaintMode } = useCells();
  const isMac = useIsMac();

  const onQuickAccess = () => {
    updateCursor(activeTile?.src ?? defaultTile.src);
    updateActiveTile(activeTile ?? defaultTile);
    updatePaintMode("paint");
  };

  useHotkeys(["ctrl+a", "mod+a"], () => onQuickAccess());

  return (
    <TooltipTrigger delay={300}>
      <Button
        onPress={onQuickAccess}
        className="outline-none hover:bg-black p-2 focus-visible:ring-2 ring-yellow-400 rounded"
      >
        <img src={activeTile?.src ?? defaultTile.src} className="w-5 h-5" />
      </Button>
      <Tooltip>
        Quick asset
        <span className="flex gap-1 text-dark-gray">
          {isMac ? (
            <>
              <kbd className="kbd kbd-sm">⌘</kbd>
              <kbd className="kbd kbd-sm">a</kbd>
            </>
          ) : (
            <>
              <kbd className="kbd kbd-sm">Ctrl</kbd>
              <kbd className="kbd kbd-sm">a</kbd>
            </>
          )}
        </span>
      </Tooltip>
    </TooltipTrigger>
  );
};
