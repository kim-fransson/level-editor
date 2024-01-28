import { useState, useEffect } from "react";

export const useIsMac = (): boolean => {
  const [isMac, setIsMac] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMac = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      setIsMac(userAgent.includes("mac"));
    };

    checkIsMac();

    window.addEventListener("resize", checkIsMac);

    return () => {
      window.removeEventListener("resize", checkIsMac);
    };
  }, []);

  return isMac;
};
