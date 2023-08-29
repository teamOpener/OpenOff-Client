import { ViewProps } from 'react-native';
import dayjs from 'dayjs';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { EventIndexStatisticsDto } from 'models/event/response/EventIndexStatisticsDto';
import dateCardStyles from './DateCard.style';

interface Props extends ViewProps {
  indexList: EventIndexStatisticsDto;
  maxCapacity: number;
}

const DateCard = ({ indexList, maxCapacity, ...rest }: Props) => {
  return (
    <SpaceLayout size={5} style={dateCardStyles.container} {...rest}>
      <SpaceLayout direction="row" size={7} style={dateCardStyles.alignCenter}>
        <Icon name="IconUser" fill="main" size={13} />
        <Text
          color="main"
          style={dateCardStyles.text}
        >{`${indexList.approvedUserCount}/${maxCapacity}`}</Text>
      </SpaceLayout>

      <SpaceLayout direction="row" size={7} style={dateCardStyles.alignCenter}>
        <Icon name="IconCalendar" fill="main" size={13} />
        <Text color="main" style={dateCardStyles.text}>{`${dayjs(
          indexList.eventDate,
        ).format('M.D(ddd) HH:mm')}`}</Text>
      </SpaceLayout>
    </SpaceLayout>
  );
};

export default DateCard;
