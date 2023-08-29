import Text from 'components/common/Text/Text';
import { TouchableOpacity } from 'react-native';
import { colors } from 'styles/theme';
import { Option } from 'types/apps/selectbox';
import selectDetailButtonStyles from './SelectDetailButton.style';

interface Props {
  option: Option;
  isActive: boolean;
  handlePress: (option: Option) => void;
}

const SelectDetailButton = ({ option, isActive, handlePress }: Props) => {
  const computedActiveStyle = {
    borderColor: isActive ? 'transparent' : colors.grey,
    backgroundColor: isActive ? colors.main : colors.background,
    fontColor: isActive
      ? ('white' as keyof typeof colors)
      : ('grey' as keyof typeof colors),
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        ...selectDetailButtonStyles.container,
        backgroundColor: computedActiveStyle.backgroundColor,
        borderColor: computedActiveStyle.borderColor,
      }}
      onPress={() => handlePress(option)}
    >
      <Text variant="body2" color={computedActiveStyle.fontColor}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectDetailButton;
