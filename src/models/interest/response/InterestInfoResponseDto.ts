import { FieldCode } from 'constants/interest/interest';

export interface InterestInfoResponseDto {
  interestConstName: FieldCode;
  interestCode: string;
  interestValue: string;
}
