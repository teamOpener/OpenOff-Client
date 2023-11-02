import i18n from 'locales';
import FieldButton from 'components/authorize/buttons/FieldButton/FieldButton';
import Text from 'components/common/Text/Text';
import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { Field } from 'types/interest';
import fieldButtonGroupStyles from './FieldButtonGroup.style';

interface Props {
  fields: Field[];
  setFields: Dispatch<SetStateAction<Field[]>>;
  computedCount: number;
}

const FieldButtonGroup = ({ fields, setFields, computedCount }: Props) => {
  const handleFieldActive = (field: Field) => {
    if (computedCount >= 3 && !field.isActive) return;
    setFields(
      fields.map((mappingField) => {
        if (mappingField.value === field.value) {
          Object.assign(mappingField, { isActive: !mappingField.isActive });
        }
        return mappingField;
      }),
    );
  };
  return (
    <View style={fieldButtonGroupStyles.container}>
      <Text style={fieldButtonGroupStyles.title}>
        {i18n.t('up_to_three_can_be_selected')}
      </Text>
      <View style={fieldButtonGroupStyles.fieldContainer}>
        {fields.map((field) => (
          <FieldButton
            key={field.value}
            field={field}
            handlePress={handleFieldActive}
          />
        ))}
      </View>
    </View>
  );
};

export default FieldButtonGroup;
