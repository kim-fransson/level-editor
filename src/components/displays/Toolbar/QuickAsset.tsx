import { Tooltip } from "@/components";
import { tiles } from "@/data/tiles";
import { useApp } from "@/hooks";
import { Button, TooltipTrigger } from "react-aria-components";

const defaultTile = tiles[0];

export const QuickAsset = () => {
  const { activeTile, updateCursor, updateActiveTile } = useApp();

  const onQuickAccess = () => {
    updateCursor(activeTile?.src ?? defaultTile.src);
    updateActiveTile(activeTile ?? defaultTile);
  };

  return (
    <TooltipTrigger delay={300}>
      <Button
        onPress={onQuickAccess}
        className="outline-none hover:bg-black p-2 focus-visible:ring-2 ring-yellow-400 rounded"
      >
        <img src={activeTile?.src ?? defaultTile.src} className="w-5 h-5" />
      </Button>
      <Tooltip>Quick asset</Tooltip>
    </TooltipTrigger>
  );
};
