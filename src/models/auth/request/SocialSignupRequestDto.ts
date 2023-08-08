export interface SocialSignupRequestDto {
  socialType: 'google' | 'kakao' | 'apple';
  token: string;
}
