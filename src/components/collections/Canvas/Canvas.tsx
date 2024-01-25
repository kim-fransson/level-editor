import { useApp, useCells } from "@/hooks";
import { generateGridList } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { ListBox, ListBoxItem } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export interface CanvasProps {}

export const Canvas = () => {
  const { activeTile } = useApp();
  const { paintedCells, updatePaintedCells } = useCells();

  const [isPressing, setIsPressing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = () => setIsPressing(true);
    const onPointerUp = () => setIsPressing(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        setIsPressing(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        setIsPressing(false);
      }
    };

    const container = containerRef.current;

    if (container) {
      container.addEventListener("pointerdown", onPointerDown, true);
      container.addEventListener("pointerup", onPointerUp, true);
      container.addEventListener("keydown", onKeyDown, true);
      container.addEventListener("keyup", onKeyUp, true);
    }

    return () => {
      if (container) {
        container.removeEventListener("pointerdown", onPointerDown, true);
        container.removeEventListener("pointerup", onPointerUp, true);
        container.removeEventListener("keydown", onKeyDown, true);
        container.removeEventListener("keyup", onKeyUp, true);
      }
    };
  }, []);

  const paintCell = (cellId: number) => {
    const isPainted = paintedCells.find((cell) => cell.id === cellId);

    if (!isPainted) {
      const updatedPaintedCells = [
        ...paintedCells,
        { id: cellId, tile: activeTile },
      ];
      updatePaintedCells(updatedPaintedCells);
    }
  };

  return (
    <div ref={containerRef}>
      <ListBox
        className={`inline-grid grid-cols-15 bg-white *:border-light-gray *:border-[0.5px] border-[0.5px] border-light-gray`}
        items={generateGridList(15, 15)}
        selectedKeys={paintedCells.map((cell) => cell.id)}
        selectionMode="multiple"
        layout="grid"
        orientation="vertical"
        aria-label="paint cell"
      >
        {(item) => (
          <ListBoxItem
            textValue={`cell number ${item.id}`}
            className="w-8 h-8 outline-none flex selected:border-none"
            id={item.id}
          >
            {({ isSelected, isFocusVisible, isHovered }) => (
              <Cell
                activeTile={activeTile}
                tile={paintedCells.find((cell) => cell.id === item.id)?.tile}
                isSelected={isSelected}
                isFocusVisible={isFocusVisible}
                isPressing={isPressing}
                isHovered={isHovered}
                onSelect={() => paintCell(item.id)}
              />
            )}
          </ListBoxItem>
        )}
      </ListBox>
    </div>
  );
};

interface CellProps {
  activeTile?: Tile;
  tile?: Tile;
  isSelected?: boolean;
  isFocusVisible?: boolean;
  isPressing?: boolean;
  isHovered?: boolean;
  onSelect: () => void;
}
const Cell = ({
  activeTile,
  tile,
  isSelected,
  isFocusVisible,
  isPressing,
  isHovered,
  onSelect,
}: CellProps) => {
  useEffect(() => {
    if (activeTile && isPressing && (isHovered || isFocusVisible)) {
      onSelect();
    }
  }, [isHovered, isPressing, isFocusVisible, onSelect, activeTile]);

  return (
    <div className="flex-1 group flex justify-center items-center relative">
      {tile && isSelected && (
        <img
          className={twMerge(isSelected ? "block" : "hidden", "w-full h-full")}
          src={tile.src}
        />
      )}
      {!isSelected && activeTile && (
        <img
          src={activeTile.src}
          className={twMerge(
            "absolute w-full h-full hidden group-hover:block opacity-50",
            isFocusVisible ? "block" : "",
          )}
        />
      )}
    </div>
  );
};
