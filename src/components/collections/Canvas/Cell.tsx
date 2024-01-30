import { PressingContext } from "@/components";
import { useApp, useLevel } from "@/hooks";
import { useCallback, useContext, useEffect, useState } from "react";
import { mergeProps, useHover, usePress } from "react-aria";
import { twMerge } from "tailwind-merge";

export interface CellProps {
  tile?: Tile;
  isFocusVisible: boolean;
  cell: Cell;
}

export const Cell = ({ isFocusVisible, cell }: CellProps) => {
  const { paint, mode, erase } = useLevel();
  const { activeTile } = useApp();
  const isPressing = useContext(PressingContext);
  const [isHovered, setIsHovered] = useState(false);

  const { hoverProps } = useHover({
    onHoverChange: setIsHovered,
  });

  const handleInteraction = useCallback(() => {
    if (mode === "paint") {
      paint(cell, activeTile?.src);
    } else if (mode === "erase") {
      erase(cell);
    }
  }, [activeTile?.src, cell, erase, mode, paint]);

  const { pressProps } = usePress({
    onPressStart: handleInteraction,
  });

  useEffect(() => {
    if ((isFocusVisible || isHovered) && isPressing) {
      handleInteraction();
      setIsHovered(false);
    }
  }, [isHovered, isFocusVisible, isPressing, handleInteraction]);

  return (
    <div
      {...mergeProps(pressProps, hoverProps)}
      className={twMerge(
        "flex-1 group flex justify-center items-center relative transition-opacity overflow-hidden",
        "border-[0.5px] border-light-gray",
        isFocusVisible && "border-yellow-400 border-2",
        cell.images.length > 0 && "border-none",
        mode === "erase" && "hover:opacity-50",
      )}
    >
      {cell.images.length > 0 &&
        cell.images.map((img, index) => (
          <img
            key={`${img}-${index}`}
            className="w-full h-full absolute"
            src={img}
          />
        ))}
      {activeTile && mode === "paint" && (
        <img
          src={activeTile.src}
          className={twMerge(
            "absolute w-full h-full",
            isHovered || isFocusVisible ? "opacity-50 block" : "hidden",
          )}
        />
      )}
    </div>
  );
};
