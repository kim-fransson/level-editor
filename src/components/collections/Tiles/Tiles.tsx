import { ListBox, ListBoxItem } from "react-aria-components";

export interface TilesProps {
  tiles: Tile[];
  onSelectTile: (tile: Tile) => void;
}

export const Tiles = ({ tiles, onSelectTile }: TilesProps) => {
  return (
    <ListBox
      items={tiles}
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
          className="w-10 h-10 hover:bg-dark-gray cursor-pointer flex justify-center items-center 
          transition-colors rounded-[4px] selected:bg-blue focus-visible:ring-2 ring-yellow-400 outline-none
          select-none"
          id={item.id}
        >
          <img src={item.src} className="w-6 h-6" />
        </ListBoxItem>
      )}
    </ListBox>
  );
};
