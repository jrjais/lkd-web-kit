'use client';
import React, { ComponentPropsWithoutRef } from 'react';

export type IconFC = React.FC<ComponentPropsWithoutRef<'svg'>>;
export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  i: IconFC;
  /**
   * @property xs: 16px
   * @property sm: 20px
   * @property md: 24px
   * @property lg: 28px
   * @property xl: 32px
   * @property 2xl: 40px
   */
  size?: keyof typeof stylesBySize | number;
}

export const Icon = ({ i: I, size = 'md', style, rotate, ...rest }: IconProps) => {
  return (
    <I
      {...(typeof size === 'number'
        ? {
            height: size,
            width: size,
          }
        : stylesBySize[size])}
      viewBox="0 0 24 24"
      style={{
        ...style,
        flexShrink: 0,
        transform: `rotate(${rotate}deg)`,
      }}
      {...rest}
    />
  );
};

const stylesBySize = {
  xs: {
    height: 16,
    width: 16,
  },
  sm: {
    height: 20,
    width: 20,
  },
  md: {
    height: 24,
    width: 24,
  },
  lg: {
    height: 28,
    width: 28,
  },
  xl: {
    height: 32,
    width: 32,
  },
  ['2xl']: {
    height: 40,
    width: 40,
  },
};
