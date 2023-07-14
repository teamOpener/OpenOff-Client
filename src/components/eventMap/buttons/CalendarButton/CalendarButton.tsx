import Text from 'components/common/Text/Text';
import { TouchableOpacity } from 'react-native';
import { colors } from 'styles/theme';
import colorButtonStyles from './CalendarButton.style';

interface Props {
  label: string;
  color?: keyof typeof colors;
  width: number;
  marginRight?: number;
  marginLeft?: number;
  marginBottom?: number;
  borderColor?: string;
  backgroundColor: string;
  handleClick: () => void;
}

const CalendarButton = ({
  label,
  color,
  width,
  backgroundColor,
  handleClick,
  marginRight = 0,
  marginLeft = 0,
  marginBottom = 0,
  borderColor = 'transparent',
}: Props) => {
  return (
    <TouchableOpacity
      style={{
        ...colorButtonStyles.container,
        width,
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

export default CalendarButton;
