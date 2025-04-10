import { InfiniteData } from '@tanstack/react-query';
import { RefObject, useEffect } from 'react';
import { InfiniteQueryHookResult } from 'react-query-kit';
import { useOnScrollProgress } from './useOnScrollProgress';
import ApiPagination from 'src/types/api-pagination';

export const useFetchNextPageOnScroll = (
  infinity: InfiniteQueryHookResult<InfiniteData<ApiPagination<unknown>, number>, Error>,
  elementRef?: RefObject<HTMLElement | null>,
) => {
  useOnScrollProgress(
    0.9,
    () => {
      if (infinity.hasNextPage) {
        infinity.fetchNextPage();
      }
    },
    elementRef,
  );

  useEffect(() => {
    const el = elementRef?.current;
    const scrollTarget = el ?? document.documentElement;

    const hasScroll = scrollTarget.scrollHeight > scrollTarget.clientHeight;

    if (!hasScroll && infinity.hasNextPage) {
      infinity.fetchNextPage();
    }
  }, [infinity.data, elementRef]);
};
