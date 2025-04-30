import {
  AppShell,
  MantineTheme,
  Menu,
  Select,
  Tooltip,
  Notification,
  MantineThemeOverride,
  Portal,
} from '@mantine/core';
import { breakpointsWithPx } from './breakpoints-with-px';

export const myDefaultTheme: MantineThemeOverride = {
  breakpoints: breakpointsWithPx,
  cursorType: 'pointer',
  components: {
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
        w: 300,
      },
    }),
    // borrar en v8
    Portal: Portal.extend({
      defaultProps: {
        reuseTargetNode: true,
      },
    }),
  },
};
