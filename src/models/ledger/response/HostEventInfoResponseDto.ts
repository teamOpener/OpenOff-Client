import { FieldCode } from 'constants/code';
import { EventIndexInfo } from '../entity/EventIndexInfo';

export interface HostEventInfoResponseDto {
  eventInfoId: number;
  isApproved: boolean;
  eventTitle: string;
  fieldTypeList: FieldCode[];
  eventIndexInfoList: EventIndexInfo[];
}
