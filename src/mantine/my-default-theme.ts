import {
  AppShell,
  Container,
  type MantineThemeOverride,
  Menu,
  Notification,
  rem,
  Select,
  Tooltip,
} from '@mantine/core'
import { breakpointsWithPx } from './breakpoints-with-px'

const CONTAINER_SIZES: Record<string, number> = {
  xs: 960,
  sm: 1024,
  md: 1152,
  lg: 1280,
  xl: 1652,
}

export const myDefaultTheme: MantineThemeOverride = {
  breakpoints: breakpointsWithPx,
  cursorType: 'pointer',
  defaultRadius: 'sm',
  components: {
    Container: Container.extend({
      defaultProps: {
        size: 'xl',
        px: 'md',
      },
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : typeof size === 'string' && size in CONTAINER_SIZES
              ? rem(CONTAINER_SIZES[size])
              : typeof size === 'number'
                ? rem(size)
                : undefined,
        },
      }),
    }),
    Notification: Notification.extend({
      defaultProps: {
        withBorder: true,
      },
    }),
    AppShell: AppShell.extend({
      defaultProps: {
        padding: 0,
      },
    }),
    Select: Select.extend({
      defaultProps: {
        allowDeselect: false,
        withCheckIcon: false,
        clearable: true,
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        position: 'bottom-end',
      },
    }),
    Tooltip: Tooltip.extend({
      defaultProps: {
        multiline: true,
        maw: 300,
      },
    }),
  },
}
