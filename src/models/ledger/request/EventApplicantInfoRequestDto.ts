import SortType from '../entity/SortType';

export interface EventApplicantInfoRequestDto {
  eventIndexId: number;
  sort: SortType;
  username?: string;
  time?: string;
  keyword?: string;
}
