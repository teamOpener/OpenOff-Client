import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import EventCard from 'components/home/cards/EventCard/EventCard';
import EventCardSkeleton from 'components/suspense/skeleton/EventCardSkeleton/EventCardSkeleton';
import useNavigator from 'hooks/navigator/useNavigator';
import MainTapEventInfoResponseDto from 'models/event/response/MainTapEventInfoResponseDto';
import { useId } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import eventCardListStyles from './EventCardList.style';

interface Props {
  title: string;
  subTitle: string;
  events?: MainTapEventInfoResponseDto[];
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
  const { stackNavigation } = useNavigator();

  const eventCardListid = useId();

  const handleEventPress = (eventId: number) => {
    stackNavigation.navigate('EventDetail', { id: eventId });
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
      <Spacing height={5} />
      <Text variant="body2" color="main">
        {subTitle}
      </Text>
      <ScrollView
        style={eventCardListStyles.scrollConatiner}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {isLoading
          ? new Array(3)
              .fill(1)
              .map((key, _idx) => <EventCardSkeleton key={_idx} />)
          : events.map((event, eventId) => (
              <EventCard
                key={`eventCard-${eventCardListid}${eventId}`}
                event={event}
                handlePress={handleEventPress}
              />
            ))}
      </ScrollView>
    </View>
  );
};

export default EventCardList;
