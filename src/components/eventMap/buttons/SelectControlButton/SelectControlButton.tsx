import Text from 'components/common/Text/Text';
import { TouchableOpacity } from 'react-native';
import selectControlButtonStyles from './SelectControlButton.style';

interface Props {
  handlePress: () => void;
  label: string;
  color:
    | 'background'
    | 'white'
    | 'black'
    | 'grey'
    | 'darkGrey'
    | 'main'
    | 'point'
    | 'error'
    | undefined;
  borderColor?: string;
  backgroundColor?: string;
}

const SelectControlButton = ({
  handlePress,
  label,
  color,
  backgroundColor = 'transparent',
  borderColor = 'transparent',
}: Props) => {
  return (
    <TouchableOpacity
      style={{
        ...selectControlButtonStyles.container,
        backgroundColor,
        borderColor,
      }}
      onPress={handlePress}
    >
      <Text variant="h4" color={color}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectControlButton;
