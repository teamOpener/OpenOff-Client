import { FieldCode } from 'constants/code';

interface EventFieldListRequestDto {
  field: FieldCode;
  eventInfoId: number;
}

export default EventFieldListRequestDto;
