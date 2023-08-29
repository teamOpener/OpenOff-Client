import { useInterestFieldLists } from 'hooks/queries/interest';
import { Field } from 'types/interest';

const useInterestFields = () => {
  const { data: interestFields } = useInterestFieldLists();

  const generateInterestFieldTags = (): Field[] => {
    if (!interestFields) {
      return [];
    }
    return interestFields.map((field) => ({
      value: field.interestConstName,
      isActive: false,
      label: field.interestValue,
    }));
  };

  return { generateInterestFieldTags };
};

export default useInterestFields;
