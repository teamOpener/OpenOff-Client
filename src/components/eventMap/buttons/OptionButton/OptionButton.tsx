import Text from 'components/common/Text/Text';
import { TouchableOpacity } from 'react-native';
import { Option } from 'types/apps/selectbox';
import optionButtonStyles from './OptionButton.style';

interface Props {
  option: Option;
  select: (option: Option) => void;
}

const OptionButton = ({ select, option }: Props) => {
  return (
    <TouchableOpacity
      style={optionButtonStyles.container}
      onPress={() => select(option)}
    >
      <Text variant="body3" color="white">
        {option.label}
      </Text>
    </TouchableOpacity>
  );
};

export default OptionButton;
