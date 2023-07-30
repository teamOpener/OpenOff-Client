// TODO: 삭제
const fakeApi = (data?: any) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        code: 200,
        message: 'SUCCESS',
        timestamp: new Date(),
        data,
      };
      resolve(response);
    }, 1700);
  });

export default fakeApi;
