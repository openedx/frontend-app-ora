import { QueryClient } from "@tanstack/query-core";

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

export type MutationStatus = 'idle' | 'loading' | 'error' | 'success'

export type ActionMutationFunction = (args: any, queryClient: QueryClient) => Promise<any>
