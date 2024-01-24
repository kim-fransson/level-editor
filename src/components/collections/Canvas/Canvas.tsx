import { generateGridList } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { ListBox, ListBoxItem } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export interface CanvasProps {
  activeTile?: Tile;
}

export const Canvas = ({ activeTile }: CanvasProps) => {
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
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
    const isPainted = selectedCells.find((cell) => cell.id === cellId);

    if (!isPainted) {
      setSelectedCells((curr) => [...curr, { id: cellId, tile: activeTile }]);
    } else if (isPainted.tile?.id !== activeTile?.id) {
      setSelectedCells((curr) =>
        curr.map((cell) =>
          cell.id === cellId ? { ...cell, tile: activeTile } : cell,
        ),
      );
    }
  };

  return (
    <div ref={containerRef}>
      <ListBox
        className={`inline-grid grid-cols-15 bg-white *:border-light-gray *:border-[0.5px] border-[0.5px] border-light-gray`}
        items={generateGridList(15, 15)}
        selectedKeys={selectedCells.map((cell) => cell.id)}
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
                tile={selectedCells.find((cell) => cell.id === item.id)?.tile}
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

  if (isFocusVisible || isHovered) {
    return (
      activeTile && (
        <div className="flex-1 flex justify-center items-center relative">
          <img
            src={activeTile.src}
            className="absolute w-full h-full opacity-50"
          />
        </div>
      )
    );
  }

  return (
    tile && (
      <div className="flex-1 flex justify-center items-center relative">
        <img
          className={twMerge(isSelected ? "block" : "hidden", "w-full h-full")}
          src={tile.src}
        />
      </div>
    )
  );
};