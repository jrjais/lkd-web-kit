import { Button, type ButtonProps } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import type { InfiniteData } from "@tanstack/react-query";
import clsx from "clsx";
import { type RefObject, useEffect } from "react";
import type { InfiniteQueryHookResult } from "react-query-kit";

export interface InfinityLoadMoreButtonProps<T> extends ButtonProps {
  infinity: InfiniteQueryHookResult<InfiniteData<{ data: T[] }, number>, Error>;
  parentRef?: RefObject<HTMLElement | null>;
  labels?: {
    loadMore?: string;
    loading?: string;
    end?: string;
  };
}

export const InfinityLoadMoreButton = <T,>({
  infinity,
  labels,
  parentRef,
  ...props
}: InfinityLoadMoreButtonProps<T>) => {
  const { entry, ref } = useIntersection({
    root: parentRef?.current,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.5,
  });

  const {
    loadMore = "Cargar más",
    loading = "Cargando...",
    end = "Fin de la lista",
  } = labels || {};

  const { hasNextPage, isFetchingNextPage, fetchNextPage } = infinity;

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && entry?.isIntersecting)
      fetchNextPage();
  }, [entry?.isIntersecting]);

  return (
    <Button
      ref={ref}
      onClick={() => fetchNextPage()}
      className={clsx(
        (!hasNextPage || isFetchingNextPage) && "pointer-events-none",
        "font-medium",
      )}
      variant="transparent"
      color={!hasNextPage ? "gray" : undefined}
      {...props}
    >
      {isFetchingNextPage ? loading : hasNextPage ? loadMore : end}
    </Button>
  );
};
