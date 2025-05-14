'use client';
import { InfiniteData } from '@tanstack/react-query';
import { RefObject, useEffect } from 'react';
import { InfiniteQueryHookResult } from 'react-query-kit';
import { useOnScrollProgress } from './useOnScrollProgress';

export type FetchNextPageOnScrollOptions = {
  infinity: InfiniteQueryHookResult<InfiniteData<{ data: unknown[] }, number>, Error>;
  scrollRef?: RefObject<HTMLElement | null>;
  disabled?: boolean;
};

export const useFetchNextPageOnScroll = ({
  infinity,
  scrollRef,
  disabled = false,
}: FetchNextPageOnScrollOptions) => {
  useOnScrollProgress({
    triggerPercentage: 0.9,
    callback: () => {
      if (infinity.hasNextPage) infinity.fetchNextPage();
    },
    scrollRef,
    disabled,
  });

  // useEffect(() => {
  //   // Si está deshabilitado o scrollRef está definido pero current es null, desactivamos el comportamiento
  //   if (disabled || (scrollRef && scrollRef.current === null)) {
  //     return;
  //   }

  //   const el = scrollRef?.current;
  //   const scrollTarget = el ?? document.documentElement;

  //   const hasScroll = scrollTarget.scrollHeight > scrollTarget.clientHeight;

  //   if (!hasScroll && infinity.hasNextPage) infinity.fetchNextPage();
  // }, [infinity.data, scrollRef, disabled]);
};
