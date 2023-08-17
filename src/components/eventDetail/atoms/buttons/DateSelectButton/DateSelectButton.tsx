import dayjs from 'dayjs';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { colors } from 'styles/theme';
import dateSelectButtonStyles from './DateSelectButton.style';

interface Props extends TouchableOpacityProps {
  isSelected: boolean;
  disabled?: boolean;
  eventDate: string;
  approvedUserCount: number;
  maxCapacity: number;
}

const DateSelectButton = ({
  isSelected,
  disabled = false,
  eventDate,
  approvedUserCount,
  maxCapacity,
  ...rest
}: Props) => {
  const textColor = (): keyof typeof colors => {
    if (isSelected) {
      return 'main';
    }
    if (disabled) {
      return 'grey';
    }
    return 'white';
  };

  return (
    <TouchableOpacity activeOpacity={0.6} {...rest}>
      <SpaceLayout
        direction="row"
        size={5}
        style={[
          dateSelectButtonStyles.container,
          isSelected && dateSelectButtonStyles.activeContainer,
          disabled && dateSelectButtonStyles.disabledContainer,
        ]}
      >
        <Text color={textColor()} style={dateSelectButtonStyles.dateText}>
          {dayjs(eventDate).format('YYYY.MM.DD (ddd) HH시 mm분')}
        </Text>
        <Text
          color={isSelected ? 'main' : 'grey'}
          style={dateSelectButtonStyles.countText}
        >{`${approvedUserCount}/${maxCapacity}`}</Text>
      </SpaceLayout>
    </TouchableOpacity>
  );
};

export default DateSelectButton;
