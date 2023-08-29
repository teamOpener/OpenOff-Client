import { FieldCode } from 'constants/code';

export interface InterestInfoResponseDto {
  interestConstName: FieldCode;
  interestCode: string;
  interestValue: string;
}
