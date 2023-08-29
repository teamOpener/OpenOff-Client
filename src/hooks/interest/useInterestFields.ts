import { FieldCode } from 'constants/interest';
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

  const getInterestFieldName = (fieldCode: FieldCode): string | undefined => {
    return interestFields?.find(
      (field) => field.interestConstName === fieldCode,
    )?.interestValue;
  };

  return { generateInterestFieldTags, getInterestFieldName };
};

export default useInterestFields;
