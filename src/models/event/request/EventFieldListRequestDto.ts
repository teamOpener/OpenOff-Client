import { FieldCode } from 'constants/interest';

interface EventFieldListRequestDto {
  field: FieldCode;
  eventInfoId: number;
}

export default EventFieldListRequestDto;
