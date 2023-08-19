import { AnswerInfo } from '../entity/AnswerInfo';

export interface ApplyEventRequestDto {
  eventIndexId: number;
  answerInfoList: AnswerInfo[];
}
