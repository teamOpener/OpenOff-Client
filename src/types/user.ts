type SocialType = 'KAKAO' | 'NAVER' | 'GOOGLE' | 'APPLE' | 'NORMAL';

interface SocialAccountInfo {
  id: string;
  accountType: SocialType;
  socialId: string;
  email: string;
  socialName: string;
}

export type { SocialAccountInfo, SocialType };
