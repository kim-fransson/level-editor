/* eslint-disable react-hooks/exhaustive-deps */
import { useApp, useCells } from "@/hooks";
import { generateGridList } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { ListBox, ListBoxItem } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export interface CanvasProps {}

export const Canvas = () => {
  const { activeTile } = useApp();
  const { paintedCells, updatePaintedCells, paintMode } = useCells();

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

    if (!isPainted && paintMode === "paint") {
      const updatedPaintedCells = [
        ...paintedCells,
        { id: cellId, tile: activeTile },
      ];
      updatePaintedCells(updatedPaintedCells);
    } else if (isPainted && paintMode === "erase") {
      updatePaintedCells(paintedCells.filter((cell) => cell.id !== cellId));
    }
  };

  return (
    <div ref={containerRef}>
      <ListBox
        className={`inline-grid grid-cols-15 bg-white border-[0.5px] border-light-gray`}
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
            className="w-8 h-8 flex outline-none"
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
                paintMode={paintMode}
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
  paintMode: PaintMode;
}
const Cell = ({
  activeTile,
  tile,
  isSelected,
  isFocusVisible,
  isPressing,
  isHovered,
  onSelect,
  paintMode,
}: CellProps) => {
  useEffect(() => {
    if (
      (activeTile || paintMode === "erase") &&
      isPressing &&
      (isHovered || isFocusVisible)
    ) {
      onSelect();
    }
  }, [isHovered, isPressing, isFocusVisible, onSelect]);

  return (
    <div
      className={twMerge(
        "flex-1 group flex justify-center items-center relative transition-opacity overflow-hidden",
        "border-[0.5px] border-light-gray",
        isSelected && !isFocusVisible && "border-none",
        isFocusVisible && "border-yellow-400 border-2",
      )}
    >
      {tile && isSelected && (
        <img
          className={twMerge(
            isSelected ? "block" : "hidden",
            "w-full h-full",
            paintMode === "erase" && "hover:opacity-50",
          )}
          src={tile.src}
        />
      )}
      {!isSelected && activeTile && paintMode === "paint" && (
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
