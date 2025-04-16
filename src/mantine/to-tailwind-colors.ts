import { MantineColorShade, DefaultMantineColor, MantineThemeColors } from '@mantine/core';

export const toTailwindColors = (colors: MantineThemeColors) =>
  Object.entries(colors).reduce(
    (acc, [key, value]) => {
      acc[key] = value.reduce(
        (acc, color, index) => {
          acc[index as MantineColorShade] = color;
          return acc;
        },
        {} as Record<MantineColorShade, string>,
      );

      return acc;
    },
    {} as Record<DefaultMantineColor, Record<MantineColorShade, string>>,
  );
