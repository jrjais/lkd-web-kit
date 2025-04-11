import { InfiniteData } from '@tanstack/react-query';

export const isInfinityEmpty = (data: InfiniteData<{ data: unknown[] }> | undefined) =>
  data?.pages[0].data.length === 0;
