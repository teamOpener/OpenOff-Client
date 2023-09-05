import { FieldCode } from 'constants/interest/interest';
import { EventApplicantLadgerInfo } from '../entity/EventApplicantLadgerInfo';

export interface ApplicationInfoResponseDto {
  eventInfoId: number;
  eventTitle: string;
  eventDateList: string[];
  fieldTypeList: FieldCode[];
  eventApplicantLadgerInfoList: EventApplicantLadgerInfo[];
}
