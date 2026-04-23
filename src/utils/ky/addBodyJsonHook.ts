import { BeforeErrorHook, HTTPError, isHTTPError } from 'ky'

export type KyError<T> = HTTPError<T> & {
  response: {
    bodyJson?: T
  }
}

export const addBodyJsonHook: BeforeErrorHook = async ({ error }) => {
  if (!isHTTPError(error)) {
    return error
  }

  const bodyJson = error.data ?? {}
  ;(error as KyError<unknown>).response.bodyJson = bodyJson

  return error
}
