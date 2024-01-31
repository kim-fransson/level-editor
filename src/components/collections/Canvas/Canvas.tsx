import { useApp, useLevel } from "@/hooks";
import { ListBox, ListBoxItem } from "react-aria-components";
import { Cell } from "./Cell";

export interface CanvasProps {}

export const Canvas = () => {
  const { grid } = useLevel();
  const { zoomScale } = useApp();

  return (
    <ListBox<Cell>
      className={`grid bg-white ring-1 ring-light-gray select-none`}
      style={{
        gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
        width: `${32 * grid[0].length * (zoomScale / 100)}px`,
        height: `${32 * grid.length * (zoomScale / 100)}px`,
      }}
      items={grid.flatMap((row) => row)}
      layout="grid"
      selectionMode="none"
      orientation="vertical"
      aria-label="paint cell"
    >
      {(item) => (
        <ListBoxItem
          textValue={`cell number ${item.id}`}
          className="flex outline-none"
          id={item.id}
        >
          {({ isFocusVisible }) => (
            <Cell isFocusVisible={isFocusVisible} cell={item} />
          )}
        </ListBoxItem>
      )}
    </ListBox>
  );
};
