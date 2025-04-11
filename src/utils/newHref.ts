import queryString from 'query-string';
import { QP_BACK_URL_NAME } from 'src/contexts';

export type TParams = Record<string, any> | unknown;

export type TSearchParams = { [x: string]: any };

export type Args<T, S> = {
  params?: T;
  searchParams?: S & {
    [QP_BACK_URL_NAME]?: string;
  };
};

export const newHref =
  <T extends TParams, S extends TSearchParams = TSearchParams>(
    fn: string | ((args: Args<T, S>) => string),
  ) =>
  (args?: Args<T, S>) => {
    const href =
      typeof fn === 'string'
        ? fn
        : fn(
            args ?? {
              params: {} as T,
              searchParams: {} as S,
            },
          );

    if (args?.searchParams) {
      const qs = queryString.stringify(args.searchParams, {
        skipEmptyString: true,
        skipNull: true,
      });

      return `${href}${qs ? `?${qs}` : ''}`;
    }

    return href;
  };
