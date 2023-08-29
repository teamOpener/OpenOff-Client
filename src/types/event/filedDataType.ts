import { FieldCode, FieldName } from 'constants/code';

export type FieldDataType = {
  value: FieldCode;
  isActive: boolean;
  label: FieldName;
};
