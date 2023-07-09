import { Field } from 'types/apps/group';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import ColorButton from '../ColorButton/ColorButton';

interface Props {
  field: Field;
  handlePress: (field: Field) => void;
}

const FieldButton = ({ field, handlePress }: Props) => {
  const computedActiveStyle = {
    borderColor: field.isActive ? 'transparent' : colors.main,
    backgroundColor: field.isActive ? colors.main : colors.background,
    fontColor: field.isActive
      ? ('white' as keyof typeof colors)
      : ('main' as keyof typeof colors),
  };
  return (
    <ColorButton
      label={field.label}
      color={computedActiveStyle.fontColor}
      marginRight={15}
      marginBottom={15}
      borderColor={computedActiveStyle.borderColor}
      backgroundColor={computedActiveStyle.backgroundColor}
      handleClick={() => handlePress(field)}
    />
  );
};

export default FieldButton;
