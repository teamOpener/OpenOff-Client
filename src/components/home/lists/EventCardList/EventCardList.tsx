import Text from 'components/common/Text/Text';
import EventCard from 'components/home/cards/EventCard/EventCard';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Event } from 'types/event';
import useNavigator from 'hooks/navigator/useNavigator';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import eventCardListStyles from './EventCardList.style';

interface Props {
  title: string;
  subTitle: string;
  events: Event[];
  type?: 'popular' | 'custom';
}

const EventCardList = ({ events, title, subTitle, type = 'custom' }: Props) => {
  // FIXME: 임의로 넣어놨습니다!! - 제인
  const { stackNavigation } = useNavigator();

  const handlePress = () => {
    stackNavigation.navigate('EventDetail', { id: 1 });
  };
  // TODO: Popular페이지를 네비게이터에 추가 밎 아래 함수 주석 해제하기
  const handleShowPopularEvent = () => {
    // stackNavigation.navigate('Popular');
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
        {events.map((event) => (
          <EventCard
            key={event.eventInfoId}
            event={event}
            handlePress={handlePress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default EventCardList;
