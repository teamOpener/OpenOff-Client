import i18n from 'locales';
import { FieldCode } from 'constants/interest/interest';
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
      label: i18n.t(field.interestConstName as keyof typeof FieldCode),
    }));
  };

  const getInterestFieldName = (fieldCode: FieldCode): string | undefined => {
    const code =
      interestFields?.find((field) => field.interestConstName === fieldCode)
        ?.interestConstName ?? FieldCode.EA;

    const translatedCode = i18n.t(code as keyof typeof FieldCode);

    return translatedCode;
  };

  return { generateInterestFieldTags, getInterestFieldName };
};

export default useInterestFields;
