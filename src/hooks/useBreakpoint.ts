'use client';
import { breakpointsWithPx } from '../mantine/breakpoints-with-px';
import { useMediaQuery } from '@mantine/hooks';

export const useBreakpoint = (breakpoint: keyof typeof breakpointsWithPx): boolean => {
  const matches = useMediaQuery(`(min-width: ${breakpointsWithPx[breakpoint]})`);

  return matches;
};
