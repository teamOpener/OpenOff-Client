import { FieldCode } from 'constants/interest';
import { ImageUrlList } from '../entity/ImageUrlList';

export interface CreateNewEventRequestDto {
  fieldTypeList: FieldCode[];
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
  staffIdList: string[];
  hostPhoneNumber: string;
  hostEmail: string;
}
