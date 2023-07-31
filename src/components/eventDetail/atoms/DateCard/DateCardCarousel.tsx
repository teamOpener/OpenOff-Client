import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { EventIndexStatisticsDto } from 'models/event/response/EventIndexStatisticsDto';
import { CONSTANT_EVENT_DETAIL } from 'constants/eventDetail/eventDetailContants';
import DateCard from './DateCard';
import dateCardCarouselStyles from './DateCardCarousel.style';

interface Props {
  indexList: EventIndexStatisticsDto[];
  maxCapacity: number;
}

const DateCardCarousel = ({ indexList, maxCapacity }: Props) => {
  const width =
    Dimensions.get('window').width - CONSTANT_EVENT_DETAIL.SCREEN_PADDING * 2;

  return (
    <Carousel
      loop={false}
      width={width * 0.85}
      height={80}
      overscrollEnabled={false}
      panGestureHandlerProps={{ minDist: 24 }}
      style={dateCardCarouselStyles.container}
      data={indexList}
      renderItem={({ item }) => (
        <DateCard
          key={item.eventIndexId}
          approvedUserCount={item.approvedUserCount}
          maxCapacity={maxCapacity}
          eventDate={item.eventDate}
        />
      )}
    />
  );
};

export default DateCardCarousel;
