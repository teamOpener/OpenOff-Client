import { GenderType } from 'models/user/entity/GenderType';
import { QnAInfo } from '../entity/QnAInfo';

export interface ApplicantApplyDetailResponseDto {
  username: string;
  birth: string;
  genderType: GenderType;
  eventInfoId: number;
  eventIndexId: number;
  eventTitle: string;
  streetRoadAddress: string;
  eventDate: string;
  isAccepted: boolean;
  isJoined: boolean;
  qnAInfoList: QnAInfo[];
}
