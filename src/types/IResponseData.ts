import type { AxiosError } from 'axios'

export interface IResponseData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

// export type IResponseError = AxiosError

export interface IResponseError extends AxiosError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any
}
