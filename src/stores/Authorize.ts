import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Token {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

export interface AuthorizeStore {
  token: Token;
  fcmToken: string | undefined;
  isLogin: boolean;
  setToken: (token: Token) => void;
  resetToken: () => void;
  setFcmToken: (fcmToken?: string) => void;
  setIsLogin: (loginStatus: boolean) => void;
}

const initAuthorize = {
  token: {
    accessToken: undefined,
    refreshToken: undefined,
  },
  fcmToken: undefined,
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
      setFcmToken: (payload) =>
        set((state) => ({
          ...state,
          fcmToken: payload,
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
