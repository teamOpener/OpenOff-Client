import { FieldCode } from 'constants/interest/interest';

export interface Field {
  value: FieldCode;
  isActive: boolean;
  label: string;
}
