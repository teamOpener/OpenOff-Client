import { QnAInfo } from '../entity/QnAInfo';

export interface ApplicantApplyDetailResponseDto {
  username: string;
  birth: string;
  eventInfoId: number;
  eventIndexId: number;
  eventTitle: string;
  streetRoadAddress: string;
  eventDate: string;
  isAccepted: boolean;
  qnAInfoList: QnAInfo[];
}
