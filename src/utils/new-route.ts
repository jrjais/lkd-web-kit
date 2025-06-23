// https://github.com/microsoft/TypeScript/issues/14400
import { queryStringify } from './query-stringify';

type Primitive = string | number | boolean | undefined;
type Params = Record<string, Primitive>;

function buildPathFromTemplate(path: string, params: Params): string {
  return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    const value = params[key];
    if (value === undefined) {
      throw new Error(`Falta el parámetro de ruta: ${key}`);
    }
    return encodeURIComponent(String(value));
  });
}

type ExtractPathParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
  ? { [K in Param | keyof ExtractPathParams<`/${Rest}`>]: string | number }
  : T extends `${string}:${infer Param}`
    ? { [K in Param]: string | number }
    : {};

type RouteInput<PathParams extends Params, Query> = PathParams & {
  query?: Query;
};

type RouteOptions<Query, PathParams> = {
  queryBuilder?: (query: Query) => string;
  pathBuilder?: (params: PathParams) => string;
};

export function createNewRoute<GlobalQuery extends object = {}>(config?: {
  queryBuilder?: (query: GlobalQuery) => string;
}) {
  // Precalculamos el constructor de consulta global
  const globalQueryBuilder = config?.queryBuilder;

  function getPathStrategy<P>(
    arg: string | ((params: P) => string),
    options?: { pathBuilder?: (params: P) => string },
  ) {
    if (options?.pathBuilder) {
      return (params: P) => options.pathBuilder!(params);
    } else if (typeof arg === 'string') {
      const template = arg; // Capturamos el valor para evitar accesos repetidos
      return (params: P) => buildPathFromTemplate(template, params as unknown as Params);
    } else {
      const fn = arg; // Capturamos el valor para evitar accesos repetidos
      return (params: P) => fn(params);
    }
  }
  function newRoute<LocalQuery extends object = {}, Path extends string = string>(
    path: Path,
    options?: RouteOptions<LocalQuery, ExtractPathParams<Path>>,
  ): (params?: RouteInput<ExtractPathParams<Path>, GlobalQuery & LocalQuery>) => string;

  function newRoute<LocalQuery extends object = {}, PathParams extends Params = {}>(
    path: string,
    options?: RouteOptions<LocalQuery, PathParams>,
  ): (params?: RouteInput<PathParams, GlobalQuery & LocalQuery>) => string;

  function newRoute<LocalQuery extends object = {}, PathParams extends Params = {}>(
    pathBuilder: (params: PathParams) => string,
    options?: RouteOptions<LocalQuery, PathParams>,
  ): (params?: RouteInput<PathParams, GlobalQuery & LocalQuery>) => string;
  function newRoute<LocalQuery extends object, PathParams extends Params>(
    arg: string | ((params: PathParams) => string),
    options?: RouteOptions<LocalQuery, PathParams>,
  ) {
    // Precalculamos la estrategia de construcción de rutas durante la creación
    const pathStrategy = getPathStrategy<PathParams>(arg, options);

    // Precalculamos el constructor de consulta durante la creación
    const queryBuilder = options?.queryBuilder || globalQueryBuilder;
    const queryStrategy = queryBuilder ? (query: any) => queryBuilder(query) : queryStringify; // Devolvemos una función optimizada que usa las estrategias precalculadas
    return (params: RouteInput<PathParams, GlobalQuery & LocalQuery> = {} as any) => {
      const { query = {}, ...pathParams } = params;
      const path = pathStrategy(pathParams as PathParams);
      const queryString = queryStrategy(query);
      return path + queryString;
    };
  }

  return newRoute;
}

export const newRoute = createNewRoute();
