import { useMatches } from '@mantine/core';
import { breakpointsWithPx } from '../mantine/breakpointsWithPx';

const useBreakpoint = (breakpoint: keyof typeof breakpointsWithPx): boolean => {
  const result = useMatches({
    [breakpoint]: true,
  });

  return !!result;
};

export default useBreakpoint;
