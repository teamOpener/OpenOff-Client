import { FieldCode } from 'constants/code';

interface EventSearchRequestDto {
  startDate?: string;
  endDate?: string;
  applyable?: boolean;
  capacity?: string;
  eventFee?: 0 | 1;
  keyword?: string;
  field?: FieldCode;
  eventId?: string;
  latitude: number;
  longitude: number;
}

export default EventSearchRequestDto;
