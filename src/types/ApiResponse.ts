type ApiResponse<T> = {
  code: number;
  message: string;
  timestamp: Date;
  data: T | undefined;
};

export default ApiResponse;
