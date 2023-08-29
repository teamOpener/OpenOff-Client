import { FieldCode, FieldName } from 'constants/code';
import { FieldDataType } from 'types/event/filedDataType';

const fieldInitData: FieldDataType[] = [
  {
    value: FieldCode.EE,
    isActive: false,
    label: FieldName.EE,
  },
  {
    value: FieldCode.S,
    isActive: false,
    label: FieldName.S,
  },
  {
    value: FieldCode.EA,
    isActive: false,
    label: FieldName.EA,
  },
  {
    value: FieldCode.FD,
    isActive: false,
    label: FieldName.FD,
  },
  {
    value: FieldCode.PF,
    isActive: false,
    label: FieldName.PF,
  },
  {
    value: FieldCode.FSDH,
    isActive: false,
    label: FieldName.FSDH,
  },
];

export default fieldInitData;
