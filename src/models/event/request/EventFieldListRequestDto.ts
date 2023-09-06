import { FieldCode } from 'constants/interest/interest';

interface EventFieldListRequestDto {
  field: FieldCode;
  eventInfoId: number;
}

export default EventFieldListRequestDto;
