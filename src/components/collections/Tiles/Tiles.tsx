import { useApp } from "@/hooks";
import { ListBox, ListBoxItem } from "react-aria-components";

export interface TilesProps {
  tiles: Tile[];
}

export const Tiles = ({ tiles }: TilesProps) => {
  const { updateCursor, updateActiveTile, activeTile } = useApp();

  const onSelectTile = (tile: Tile) => {
    updateActiveTile(tile);
    updateCursor(tile.src);
  };

  return (
    <ListBox
      items={tiles}
      selectedKeys={activeTile ? [activeTile.id] : []}
      selectionMode="single"
      layout="grid"
      orientation="vertical"
      aria-label="select tile"
      className="grid grid-cols-[min-content_min-content] gap-2"
      onSelectionChange={(selection) => {
        const id = (Array.from(selection) as number[])[0];
        const selectedTile = tiles.find((tile) => tile.id === id) as Tile;
        onSelectTile(selectedTile);
      }}
    >
      {(item) => (
        <ListBoxItem
          textValue={`tile number ${item.id}`}
          className="w-10 h-10 hover:bg-black cursor-pointer flex justify-center items-center 
          transition-colors rounded selected:bg-blue focus-visible:ring-2 ring-yellow-400 outline-none
          select-none"
          id={item.id}
        >
          <img src={item.src} className="w-6 h-6" />
        </ListBoxItem>
      )}
    </ListBox>
  );
};
