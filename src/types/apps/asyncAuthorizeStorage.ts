interface AsyncAuthorizeStorage {
  state: {
    isLogin: boolean;
    token: {
      accessToken: string;
      refreshToken: string;
    };
  };
  version: number;
}

export default AsyncAuthorizeStorage;
