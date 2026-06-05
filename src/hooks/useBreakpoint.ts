'use client'
import { useMediaQuery } from '@mantine/hooks'
import { breakpointsWithPx } from '../mantine/breakpoints-with-px'

export const useBreakpoint = (breakpoint: keyof typeof breakpointsWithPx): boolean => {
  const matches = useMediaQuery(`(min-width: ${breakpointsWithPx[breakpoint]})`)

  return matches
}
