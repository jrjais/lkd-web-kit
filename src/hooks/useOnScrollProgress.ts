import { RefObject, useEffect } from "react";

export const useOnScrollProgress = (
  triggerPercentage: number,
  callback: () => void,
  elementRef?: RefObject<HTMLElement | null>
): void => {
  if (triggerPercentage < 0 || triggerPercentage > 1) {
    throw new Error("El porcentaje debe estar entre 0 y 1");
  }

  useEffect(() => {
    let hasTriggered = false;

    const handleScroll = () => {
      const el = elementRef?.current;
      const target = el ?? document.documentElement;

      const scrollHeight = target.scrollHeight - target.clientHeight;
      const scrollTop = el ? target.scrollTop : window.scrollY;

      const scrollProgress =
        scrollHeight > 0 ? Math.min(1, scrollTop / scrollHeight) : 0;

      if (!hasTriggered && scrollProgress >= triggerPercentage) {
        callback();
        hasTriggered = true;
      }
    };

    const scrollTarget = elementRef?.current ?? window;
    scrollTarget.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      scrollTarget.removeEventListener("scroll", handleScroll);
    };
  }, [triggerPercentage, callback, elementRef]);
};
