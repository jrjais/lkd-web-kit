import { Center, CenterProps, Loader, LoaderProps } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { InfiniteData } from '@tanstack/react-query';
import clsx from 'clsx';
import { RefObject, useEffect } from 'react';
import { InfiniteQueryHookResult } from 'react-query-kit';

export interface InfinityLoaderProps extends CenterProps {
  infinity: InfiniteQueryHookResult<InfiniteData<{ data: unknown[] }, number>, Error>;
  root?: RefObject<HTMLElement | null>;
  rootMargin?: string;
  endMessage?: React.ReactNode;
  loaderProps?: LoaderProps;
}

export const InfinityLoader = ({
  root,
  infinity,
  rootMargin = '0px 0px 0px 0px',
  endMessage = 'No hay más resultados',
  loaderProps,
  ...props
}: InfinityLoaderProps) => {
  const { entry, ref } = useIntersection({
    root: root?.current,
    rootMargin,
  });

  useEffect(() => {
    if (entry?.isIntersecting && infinity.hasNextPage) infinity.fetchNextPage();
  }, [entry?.isIntersecting]);

  useEffect(() => {
    if (!entry?.isIntersecting) return;
    const el = root?.current ?? document.documentElement;
    const hasScroll = el?.scrollHeight > el?.clientHeight;

    if (!hasScroll) infinity.fetchNextPage();
  }, [entry?.isIntersecting, infinity.data?.pages.length]);

  return (
    <Center
      ref={ref}
      {...props}
      style={{
        minHeight: '1rem',
        fontSize: '14px',
        ...props.style,
      }}
    >
      {infinity.isLoading || infinity.isFetchingNextPage ? (
        <Loader {...loaderProps} />
      ) : infinity.data && infinity.data.pages.length > 1 && !infinity.hasNextPage ? (
        endMessage
      ) : null}
    </Center>
  );
};
