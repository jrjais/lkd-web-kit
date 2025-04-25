import { BeforeErrorHook, HTTPError, KyRequest, KyResponse, NormalizedOptions } from 'ky';
import { parseJSON } from './parseJson';

interface KyResponseWithBody<T> extends KyResponse<T> {
  bodyJson?: T;
}

export class KyError<T = unknown> extends HTTPError<T> {
  declare response: KyResponseWithBody<T>;
  declare request: KyRequest;
  declare options: NormalizedOptions;

  constructor(
    response: KyResponse<T>,
    request: KyRequest,
    options: NormalizedOptions,
    bodyJson: T,
  ) {
    super(response, request, options);
    this.response.bodyJson = bodyJson;
  }
}

export const addBodyJsonHook: BeforeErrorHook = async (error: KyError<unknown>) => {
  error.response.bodyJson = await parseJSON(error.response);
  return error;
};
