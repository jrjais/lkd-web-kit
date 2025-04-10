"use client";
import clsx from "clsx";
import React, { ComponentPropsWithoutRef } from "react";

export type IconFC = React.FC<ComponentPropsWithoutRef<"svg">>;
export interface IconProps extends ComponentPropsWithoutRef<"svg"> {
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

const Icon = ({
  i: I,
  size = "md",
  style,
  rotate,
  className,
  ...rest
}: IconProps) => {
  /* 
      Para que no haya colisiones de ids al renderizar el icono en varios lados, le pasamos este id a la prop idprefix.
      Esta prop es agregada gracias al archivo svgr-dynamic-ids.js que se encuentra en la raíz del proyecto.
    */

  return (
    <I
      {...(typeof size === "number"
        ? {
            height: size,
            width: size
          }
        : stylesBySize[size])}
      viewBox="0 0 24 24"
      style={{
        ...style,
        transform: `rotate(${rotate}deg)`
      }}
      className={clsx("shrink-0", className)}
      {...rest}
    />
  );
};

const stylesBySize = {
  xs: {
    height: 16,
    width: 16
  },
  sm: {
    height: 20,
    width: 20
  },
  md: {
    height: 24,
    width: 24
  },
  lg: {
    height: 28,
    width: 28
  },
  xl: {
    height: 32,
    width: 32
  },
  ["2xl"]: {
    height: 40,
    width: 40
  }
};

export default Icon;
