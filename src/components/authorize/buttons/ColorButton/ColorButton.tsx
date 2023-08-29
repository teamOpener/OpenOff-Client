import { TouchableOpacity } from 'react-native';
import Text from 'components/common/Text/Text';
import { colors } from 'styles/theme';
import colorButtonStyles from './ColorButton.style';

interface Props {
  label: string;
  color?: keyof typeof colors;
  marginRight?: number;
  marginLeft?: number;
  marginBottom?: number;
  borderColor?: string;
  backgroundColor: string;
  handleClick: () => void;
}

const ColorButton = ({
  label,
  color,
  backgroundColor,
  handleClick,
  marginRight = 0,
  marginLeft = 0,
  marginBottom = 0,
  borderColor = 'transparent',
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        ...colorButtonStyles.container,
        backgroundColor,
        borderColor,
        marginRight,
        marginLeft,
        marginBottom,
      }}
      onPress={handleClick}
    >
      <Text variant="body2" color={color}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ColorButton;
