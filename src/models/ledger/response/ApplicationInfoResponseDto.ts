import { FieldCode } from 'constants/code';

export interface ApplicationInfoResponseDto {
  eventInfoId: number;
  eventTitle: string;
  eventDateList: string[];
  fieldTypeList: FieldCode[];
  //   eventApplicantLadgerInfoList: EventApplicantLadgerInfo[];
}

// get ladger/tickets

// type params = {
//   fieldType: FieldType;
//   eventInfoId: number;
//   page: 0;
//   size: 10;
// };
