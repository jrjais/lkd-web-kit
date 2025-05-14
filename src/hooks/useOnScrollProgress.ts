'use client';
import { RefObject, useEffect } from 'react';

export type OnScrollProgressOptions = {
  triggerPercentage: number;
  callback: () => void;
  scrollRef?: RefObject<HTMLElement | null>;
  disabled?: boolean;
};

export const useOnScrollProgress = ({
  triggerPercentage,
  callback,
  scrollRef,
  disabled = false,
}: OnScrollProgressOptions): void => {
  if (triggerPercentage < 0 || triggerPercentage > 1)
    throw new Error('El porcentaje debe estar entre 0 y 1');

  useEffect(() => {
    // Si está deshabilitado o scrollRef está definido pero current es null, desactivamos el comportamiento
    if (disabled || (scrollRef && scrollRef.current === null)) return;

    let hasTriggered = false;

    const handleScroll = () => {
      const el = scrollRef?.current;
      const target = el ?? document.documentElement;

      const scrollHeight = target.scrollHeight - target.clientHeight;
      const scrollTop = el ? target.scrollTop : window.scrollY;

      const scrollProgress = scrollHeight > 0 ? Math.min(1, scrollTop / scrollHeight) : 0;

      if (!hasTriggered && scrollProgress >= triggerPercentage) {
        callback();
        hasTriggered = true;
      }
    };

    const scrollTarget = scrollRef?.current ?? window;
    scrollTarget.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);
    };
  }, [triggerPercentage, callback, scrollRef, disabled]);
};
