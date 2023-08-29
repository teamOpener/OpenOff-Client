import { FieldName } from 'constants/interest';
import { useInterestFieldLists } from 'hooks/queries/interest';
import { Field } from 'types/interest';

const useInterestFields = () => {
  const { data: interestFields } = useInterestFieldLists();

  const clickableInterestTags = (): Field[] => {
    if (!interestFields) {
      return [];
    }
    return interestFields.map((field) => ({
      value: field.interestConstName,
      isActive: false,
      label: field.interestValue as FieldName,
    }));
  };

  return { clickableInterestTags };
};

export default useInterestFields;
