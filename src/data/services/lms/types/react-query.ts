import { QueryClient } from "@tanstack/query-core";

// React-Query fields
export interface QueryStatus {
  isInitialLoading: boolean,
  isFetching: boolean,
  isLoading: boolean,
  isRefetching: boolean,
  isStale: boolean,
  error: unknown,
  status: string,
}

export interface QueryData<Response> extends QueryStatus {
  isInitialLoading: boolean,
  isFetching: boolean,
  isLoading: boolean,
  isRefetching: boolean,
  isStale: boolean,
  error: unknown,
  data: Response,
}

export type MutationStatus = 'idle' | 'loading' | 'error' | 'success'

export type ActionMutationFunction = (args: any, queryClient: QueryClient) => Promise<any>
