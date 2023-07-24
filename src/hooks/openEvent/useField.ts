import FieldCode from 'constants/code';
import { Field as FieldType } from 'types/apps/group';

interface Props {
  eventField: FieldType[];
}

const useField = ({ eventField }: Props) => {
  const toggleFieldIsActive = (
    fields: FieldType[],
    fieldToToggle: FieldType,
  ): FieldType[] => {
    return fields.map((f) => {
      if (f.value === fieldToToggle.value) {
        return { ...f, isActive: !f.isActive };
      }
      return f;
    });
  };

  const getActiveFieldCodes = (): FieldCode[] => {
    const activeFields = eventField.filter((f) => f.isActive);
    const activeFieldCodes = activeFields.map((f) => f.value);

    return activeFieldCodes;
  };

  return { toggleFieldIsActive, getActiveFieldCodes };
};

export default useField;
