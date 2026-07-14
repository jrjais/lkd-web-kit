import { createTheme, type MantineThemeOverride, mergeThemeOverrides } from '@mantine/core'
import { myDefaultTheme } from './my-default-theme'

export const createLkdTheme = (theme: MantineThemeOverride): MantineThemeOverride =>
  createTheme(mergeThemeOverrides(myDefaultTheme, theme))
