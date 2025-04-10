import { Center, CenterProps, Loader, LoaderProps } from '@mantine/core';
import { InfiniteData } from '@tanstack/react-query';
import { InfiniteQueryHookResult } from 'react-query-kit';

export interface InfinityLoaderProps extends CenterProps {
  infinity: InfiniteQueryHookResult<InfiniteData<{ data: unknown[] }>, unknown>;
  loaderProps?: LoaderProps;
}

export const InfinityLoader = ({ infinity, loaderProps, ...props }: InfinityLoaderProps) => {
  return (
    <Center {...props}>
      {infinity.isFetching ? (
        <Loader {...loaderProps} />
      ) : (
        !infinity.hasNextPage &&
        (infinity.data?.pages.length ?? 0) > 1 && <p>No hay más resultados</p>
      )}
    </Center>
  );
};
