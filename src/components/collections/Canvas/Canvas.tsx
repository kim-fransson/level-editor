import { useLevel } from "@/hooks";
import { ListBox, ListBoxItem } from "react-aria-components";
import { Cell } from "./Cell";

export interface CanvasProps {}

export const Canvas = () => {
  const { grid } = useLevel();

  return (
    <ListBox<Cell>
      className={`inline-grid bg-white border-[0.5px] border-light-gray select-none`}
      style={{
        gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
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
          className="w-8 h-8 flex outline-none"
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
