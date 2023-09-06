import { FieldCode } from 'constants/interest/interest';
import { SocialAccountInfo } from 'types/user';

interface UserTotalInfoResponseDto {
  userInfo: {
    uuid: string;
    userName: string;
    nickname: string;
    profileImageUrl: string;
    birth: {
      year: number;
      month: number;
      day: number;
      isAdult: boolean;
    };
    gender: 'MAN' | 'WOMAN';
    phoneNumber: string;
    fieldTypeList: FieldCode[];
  };
  socialAccountInfoList: SocialAccountInfo[];
}

export default UserTotalInfoResponseDto;
