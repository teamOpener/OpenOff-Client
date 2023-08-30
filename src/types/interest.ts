import { FieldCode } from 'constants/interest';

export interface Field {
  value: FieldCode;
  isActive: boolean;
  label: string;
}
