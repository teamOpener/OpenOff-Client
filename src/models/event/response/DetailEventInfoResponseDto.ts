import { ExtraQuestionInfo } from '../entity/ExtraQuestionInfo';
import { ImageUrlList } from '../entity/ImageUrlList';
import { EventIndexStatisticsDto } from './EventIndexStatisticsDto';

export interface DetailEventInfoResponseDto {
  eventId: number;
  title: string;
  streetLoadAddress: string;
  detailAddress: string;
  eventFee: number;
  maxCapacity: number;
  description: string;
  isBookmarked: boolean;
  longitude: number;
  latitude: number;
  eventApplyStartDate: string;
  eventApplyEndDate: string;
  isApplyPermit: boolean; // false면 중단됨
  isEnded: boolean; // eventIndex date 다 지나갔으면 true
  imageList: ImageUrlList[];
  indexList: EventIndexStatisticsDto[];
  extraQuestionList: ExtraQuestionInfo[];
}
