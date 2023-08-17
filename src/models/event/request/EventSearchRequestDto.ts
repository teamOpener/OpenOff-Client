import { FieldCode } from 'constants/code';
import { ParticipantValue } from 'constants/selectBox';

interface EventSearchRequestDto {
  startDate?: string;
  endDate?: string;
  applyable?: boolean;
  capacity?: ParticipantValue;
  eventFee?: 0 | 1;
  keyword?: string;
  field?: FieldCode;
  eventId?: string;
  latitude: number;
  longitude: number;
}

export default EventSearchRequestDto;
