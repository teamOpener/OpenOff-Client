import { FieldCode } from 'constants/interest';

export interface MyBookmarkEventResponseDto {
  bookmarkId: number;
  eventDateList: string[];
  eventInfoId: number;
  eventTitle: string;
  eventMainImageUrl: string;
  fieldTypeList: FieldCode[];
  streetRoadAddress: string;
  totalApplicantCount: number;
}
