import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Token {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

export interface AuthorizeStore {
  token: Token;
  isLogin: boolean;
  setToken: (token: Token) => void;
  resetToken: () => void;
  setIsLogin: (loginStatus: boolean) => void;
}

const initAuthorize = {
  token: {
    accessToken: undefined,
    refreshToken: undefined,
  },
  isLogin: false,
};

export const useAuthorizeStore = create<AuthorizeStore>()(
  persist(
    (set) => ({
      ...initAuthorize,
      setToken: (payload) =>
        set((state) => ({
          ...state,
          token: {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          },
        })),
      resetToken: () =>
        set((state) => ({
          ...state,
          token: {
            accessToken: undefined,
            refreshToken: undefined,
          },
        })),
      setIsLogin: (payload) =>
        set((state) => ({
          ...state,
          isLogin: payload,
        })),
    }),
    {
      name: 'authorize',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
