interface SocialAccountInfo {
  id: string;
  accountType: 'KAKAO' | 'GOOGLE' | 'APPLE' | 'NORMAL';
  socialId: string;
  email: string;
  socialName: string;
}

export default SocialAccountInfo;
