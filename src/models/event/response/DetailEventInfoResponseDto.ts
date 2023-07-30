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
  imageList: ImageUrlList[];
  indexList: EventIndexStatisticsDto[];
  extraQuestionList: ExtraQuestionInfo[];
}
