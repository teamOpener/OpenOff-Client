type ApiResponse<T> = {
  code: number;
  message: string;
  timestamp: Date;
  data: T | undefined;
};

// TODO: 삭제
const fakeApi = <T>(data?: T): Promise<ApiResponse<T>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const response: ApiResponse<T> = {
        code: 200,
        message: 'SUCCESS',
        timestamp: new Date(),
        data,
      };
      resolve(response);
    }, 1700);
  });

export default fakeApi;
