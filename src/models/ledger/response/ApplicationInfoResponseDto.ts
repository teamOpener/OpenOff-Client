import { FieldCode } from 'constants/code';
import { EventApplicantLadgerInfo } from '../entity/EventApplicantLadgerInfo';

export interface ApplicationInfoResponseDto {
  eventInfoId: number;
  eventTitle: string;
  eventDateList: string[];
  fieldTypeList: FieldCode[];
  eventApplicantLadgerInfoList: EventApplicantLadgerInfo[];
}
