import { AxiosError } from 'axios';

export type ApiResponse<T = object> = {
  code: number;
  message: string;
  timestamp: Date;
  data: T | undefined;
};

export type ApiErrorResponse = AxiosError<ApiResponse>;

export default ApiResponse;
