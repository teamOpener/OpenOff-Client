interface AsyncAuthorizeStorage {
  state: {
    isLogin: boolean;
    token: {
      accessToken: string;
      refreshToken: string;
    };
    fcmToken: string;
  };
  version: number;
}

export default AsyncAuthorizeStorage;
