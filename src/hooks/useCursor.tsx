import { MutableRefObject, useEffect } from "react";

export const useCursor = (img?: string, ref?: MutableRefObject<null>) => {
  useEffect(() => {
    if (!img || !ref) {
      return;
    }

    const targetElement = ref.current ? ref.current : document.body;
    if (targetElement) {
      targetElement.style.cursor = `url('${img}'), auto`;
    }

    return () => {
      targetElement.style.cursor = "auto";
    };
  }, [img, ref]);
};
