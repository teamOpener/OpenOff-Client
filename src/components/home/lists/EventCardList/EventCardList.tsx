import Text from 'components/common/Text/Text';
import EventCard from 'components/home/cards/EventCard/EventCard';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Event } from 'types/event';
import useNavigator from 'hooks/navigator/useNavigator';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import EventRowCardSkeleton from 'components/suspense/skeleton/EventRowCardSkeleton/EventRowCardSkeleton';
import { useId } from 'react';
import eventCardListStyles from './EventCardList.style';

interface Props {
  title: string;
  subTitle: string;
  events?: Event[];
  type?: 'popular' | 'custom';
  isLoading: boolean;
}

const EventCardList = ({
  events = [],
  title,
  subTitle,
  type = 'custom',
  isLoading,
}: Props) => {
  // FIXME: 임의로 넣어놨습니다!! - 제인
  const { stackNavigation } = useNavigator();

  const eventCardListid = useId();

  const handlePress = () => {
    stackNavigation.navigate('EventDetail', { id: 1 });
  };

  const handleShowPopularEvent = () => {
    stackNavigation.navigate('PopularEvent');
  };

  return (
    <View style={eventCardListStyles.container}>
      <View style={eventCardListStyles.topContainer}>
        <Text variant="h3" color="white">
          {title}
        </Text>
        {type === 'custom' ? (
          <Spacing height={2} />
        ) : (
          <TouchableOpacity
            style={eventCardListStyles.showAllButton}
            onPress={handleShowPopularEvent}
          >
            <Text variant="body3" color="grey">
              전체보기
            </Text>
            <Icon name="IconArrowRight" size={10} fill="grey" />
          </TouchableOpacity>
        )}
      </View>
      <Text variant="body2" color="main">
        {subTitle}
      </Text>
      <ScrollView
        style={eventCardListStyles.scrollConatiner}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {isLoading
          ? new Array(6)
              .fill(1)
              .map((key, _idx) => <EventRowCardSkeleton key={_idx} />)
          : events.map((event, eventId) => (
              <EventCard
                key={`eventCard-${eventCardListid}${eventId}`}
                event={event}
                handlePress={handlePress}
              />
            ))}
      </ScrollView>
    </View>
  );
};

export default EventCardList;
