import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocialType } from 'types/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Token {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

export interface AuthorizeStore {
  token: Token;
  fcmToken?: string;
  isLogin: boolean;
  recentLogin?: SocialType;
  setToken: (token: Token) => void;
  resetToken: () => void;
  setFcmToken: (fcmToken?: string) => void;
  setIsLogin: (loginStatus: boolean) => void;
  setRecentLogin: (recentLoginInfo?: SocialType) => void;
}

const initAuthorize = {
  token: {
    accessToken: undefined,
    refreshToken: undefined,
  },
  fcmToken: undefined,
  isLogin: false,
  recentLogin: undefined,
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
      setRecentLogin: (payload) =>
        set((state) => ({
          ...state,
          recentLogin: payload,
        })),
    }),
    {
      name: 'authorize',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
