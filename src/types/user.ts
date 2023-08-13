interface SocialAccountInfo {
  id: string;
  accountType: 'KAKAO' | 'GOOGLE' | 'APPLE';
  socialId: string;
  email: string;
  socialName: string;
}

export default SocialAccountInfo;
