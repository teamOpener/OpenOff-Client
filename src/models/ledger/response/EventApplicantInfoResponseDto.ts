export type GenderType = 'MAN' | 'WOMAN';

export interface EventApplicantInfoResponseDto {
  userId: string;
  username: string;
  birth: string;
  genderType: GenderType;
  ladgerId: number;
  isAccepted: boolean;
  isJoined: boolean;
  createdAt: string;
}
