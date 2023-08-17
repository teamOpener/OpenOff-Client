import { ExtraQuestionInfo } from 'models/event/entity/ExtraQuestionInfo';
import { AnswerInfo } from 'models/ledger/entity/AnswerInfo';
import { QnaTuple } from 'types/event/QnaTuple';

interface Props {
  extraQuestionList?: ExtraQuestionInfo[];
}

const useQnaList = ({ extraQuestionList = [] }: Props) => {
  const initQnaList: QnaTuple[] =
    extraQuestionList.map((questionInfo) => [questionInfo, '']) ?? [];

  const isEmptyAnswer = (arr: QnaTuple[]): boolean => {
    const hasEmptyString = arr.some(([, answer]) => answer === '');
    if (hasEmptyString) {
      return true;
    }
    return false;
  };

  const convertToAnswerInfoArray = (qnaList: QnaTuple[]): AnswerInfo[] => {
    return qnaList.map(([questionInfo, answer]) => ({
      eventExtraQuestionId: questionInfo.eventExtraQuestionId,
      answer,
    }));
  };

  return { initQnaList, isEmptyAnswer, convertToAnswerInfoArray };
};

export default useQnaList;
