import { ViewProps } from 'react-native';
import dayjs from 'dayjs';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import dateCardStyles from './DateCard.style';

interface Props extends ViewProps {
  approvedUserCount: number;
  maxCapacity: number;
  eventDate: string;
}

const DateCard = ({
  approvedUserCount,
  maxCapacity,
  eventDate,
  ...rest
}: Props) => {
  return (
    <SpaceLayout size={5} style={dateCardStyles.container} {...rest}>
      <SpaceLayout direction="row" size={7} style={dateCardStyles.alignCenter}>
        <Icon name="IconUser" fill="main" size={13} />
        <Text
          color="main"
          style={dateCardStyles.text}
        >{`${approvedUserCount}/${maxCapacity}`}</Text>
      </SpaceLayout>

      <SpaceLayout direction="row" size={7} style={dateCardStyles.alignCenter}>
        <Icon name="IconCalendar" fill="main" size={13} />
        <Text color="main" style={dateCardStyles.text}>{`${dayjs(
          eventDate,
        ).format('M.D(ddd) HH:mm')}`}</Text>
      </SpaceLayout>
    </SpaceLayout>
  );
};

export default DateCard;
