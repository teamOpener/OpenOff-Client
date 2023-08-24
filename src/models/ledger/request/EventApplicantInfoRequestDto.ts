import SortType from '../entity/SortType';

export interface EventApplicantInfoRequestDto {
  eventIndexId: number;
  sort: SortType;
  ladgerId?: number;
  username?: string;
  time?: string;
  keyword?: string;
}
