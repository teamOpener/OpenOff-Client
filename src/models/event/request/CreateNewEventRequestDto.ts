import { FieldType } from '../FieldType';
import { ImageUrlList } from '../ImageUrlList';

export interface CreateNewEventRequestDto {
  fieldTypeList: FieldType[];
  title: string;
  applicationStartDate: string;
  applicationEndDate: string;
  eventDates: string[];
  streetLoadAddress: string;
  detailAddress: string;
  eventFee: number;
  maxParticipant: number;
  description: string;
  imageDataList: ImageUrlList[];
  extraQuestionList: string[];
  hostName: string;
  hostPhoneNumber: string;
  hostEmail: string;
  //   TODO: 주최자 추가
}
