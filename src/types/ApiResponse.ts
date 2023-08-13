import { AxiosError } from 'axios';

export type ApiResponse<T = object> = {
  code: number;
  message: string;
  timestamp: Date;
  data: T;
};

export type ApiErrorResponse = AxiosError<ApiResponse>;

type InfiniteScrollDataType<T> = {
  content: Array<T>;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  last: boolean;
};

export type InfiniteScrollApiResponse<T> = ApiResponse<
  InfiniteScrollDataType<T>
>;
