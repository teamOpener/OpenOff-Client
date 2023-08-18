import { useState } from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { EventIndexStatisticsDto } from 'models/event/response/EventIndexStatisticsDto';
import { CONSTANT_EVENT_DETAIL } from 'constants/eventDetail/eventDetailConstants';
import DateCard from './DateCard';
import dateCardCarouselStyles from './DateCardCarousel.style';

interface Props {
  indexList: EventIndexStatisticsDto[];
  maxCapacity: number;
}

const DateCardCarousel = ({ indexList, maxCapacity }: Props) => {
  const width =
    Dimensions.get('window').width - CONSTANT_EVENT_DETAIL.SCREEN_PADDING * 2;

  const [carouselHeight, setCarouselHeight] = useState<number>(
    CONSTANT_EVENT_DETAIL.DATE_CAROUSEL_INITIAL_HEIGHT,
  );

  const handleHeight = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setCarouselHeight(height);
  };

  if (indexList.length === 1) {
    return (
      <DateCard
        key={indexList[0].eventIndexId}
        indexList={indexList[0]}
        maxCapacity={maxCapacity}
      />
    );
  }

  return (
    <Carousel
      loop={false}
      width={width * 0.85}
      height={carouselHeight}
      overscrollEnabled={false}
      panGestureHandlerProps={{ minDist: 24 }}
      style={dateCardCarouselStyles.container}
      data={indexList}
      renderItem={({ item }) => (
        <DateCard
          key={item.eventIndexId}
          onLayout={handleHeight}
          indexList={item}
          maxCapacity={maxCapacity}
        />
      )}
    />
  );
};

export default DateCardCarousel;
