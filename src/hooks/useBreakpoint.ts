'use client';
import { useMatches } from '@mantine/core';
import { breakpointsWithPx } from '../mantine/breakpointsWithPx';

export const useBreakpoint = (breakpoint: keyof typeof breakpointsWithPx): boolean => {
  const result = useMatches({
    [breakpoint]: true,
  });

  return !!result;
};
