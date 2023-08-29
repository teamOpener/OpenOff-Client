import { FieldName } from 'constants/code';
import { InterestInfoResponseDto } from 'models/interest/response/InterestInfoResponseDto';
import { FieldDataType } from 'types/event/filedDataType';

interface Props {
  interestFields?: InterestInfoResponseDto[];
}

const useInterestFields = ({ interestFields = [] }: Props) => {
  const clickableInterestTags = (): FieldDataType[] => {
    return interestFields.map((field) => ({
      value: field.interestConstName,
      isActive: false,
      label: field.interestValue as FieldName,
    }));
  };

  return { clickableInterestTags };
};

export default useInterestFields;
