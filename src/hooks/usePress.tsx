import { useThrottle } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";

export const usePress = () => {
  const [isPressing, setIsPressing] = useState(false);
  const throttledValue = useThrottle(isPressing, 100);

  const ref = useRef<HTMLDivElement>(null);

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
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsPressing(false);
      }
    };

    const container = ref.current;

    if (container) {
      container.addEventListener("pointerdown", onPointerDown, true);
      container.addEventListener("pointerup", onPointerUp, true);
      container.addEventListener("keydown", onKeyDown, true);
      container.addEventListener("keyup", onKeyUp, true);
      document.addEventListener("click", onClickOutside);
    }

    return () => {
      if (container) {
        container.removeEventListener("pointerdown", onPointerDown, true);
        container.removeEventListener("pointerup", onPointerUp, true);
        container.removeEventListener("keydown", onKeyDown, true);
        container.removeEventListener("keyup", onKeyUp, true);
        document.removeEventListener("click", onClickOutside);
      }
    };
  }, []);

  return [ref, throttledValue] as [React.RefObject<HTMLDivElement>, boolean];
};
