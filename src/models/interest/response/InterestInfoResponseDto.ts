import { FieldCode } from 'constants/interest';

export interface InterestInfoResponseDto {
  interestConstName: FieldCode;
  interestCode: string;
  interestValue: string;
}
