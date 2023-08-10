// React-Query fields
export interface QueryStatus {
  isLoading: boolean,
  isFetching: boolean,
  isInitialLoading: boolean,
  error: unknown,
  status: string,
}

export interface QueryData<Response> extends QueryStatus {
  isLoading: boolean,
  isFetching: boolean,
  isInitialLoading: boolean,
  error: unknown,
  data: Response,
}
