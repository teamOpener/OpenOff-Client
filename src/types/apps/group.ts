import { FieldCode } from 'constants/code';

export interface Field {
  value: FieldCode;
  isActive: boolean;
  label: string;
}
