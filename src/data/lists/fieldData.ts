import { FieldCode } from 'constants/interest/interest';
import { Field } from 'types/interest';

const fieldData: Field[] = [
  {
    value: FieldCode.EE,
    isActive: false,
    label: '전시회/플리마켓',
  },
  {
    value: FieldCode.S,
    isActive: false,
    label: '공연',
  },
  {
    value: FieldCode.EA,
    isActive: false,
    label: '운동/액티비티',
  },
  {
    value: FieldCode.FD,
    isActive: false,
    label: '푸드/드링크',
  },
  {
    value: FieldCode.PF,
    isActive: false,
    label: '파티/페스티벌',
  },
  {
    value: FieldCode.FSDH,
    isActive: false,
    label: '친목/일일호프',
  },
];

export default fieldData;
