import { VirtualItem } from '@tanstack/react-virtual';
import { ComponentProps } from 'react';

export const getVirtualItemProps = (
  item: VirtualItem,
  virtualizer: {
    options: { scrollMargin: number };
    measureElement: (element: Element | null) => void;
  },
): ComponentProps<'div'> & {
  ['data-index']: number;
} => {
  return {
    ref: virtualizer.measureElement,
    ['data-index']: item.index,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      transform: `translateY(${item.start - virtualizer.options.scrollMargin}px)`,
    },
    key: item.key,
  };
};

export const getVirtualContainerProps = (virtualizer: {
  getTotalSize: () => number;
}): ComponentProps<'div'> => {
  return {
    style: {
      height: virtualizer.getTotalSize(),
      width: '100%',
      position: 'relative',
    },
  };
};
