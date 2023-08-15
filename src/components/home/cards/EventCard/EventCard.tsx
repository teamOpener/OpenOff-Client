import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import BookmarkButton from 'components/home/buttons/BookmarkButton/BookmarkButton';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import MainTapEventInfoResponseDto from 'models/event/response/MainTapEventInfoResponseDto';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import eventCardStyles from './EventCard.style';

interface Props {
  event: MainTapEventInfoResponseDto;
  type?: 'default' | 'scrap';
  handlePress: (eventId: number) => void;
}

const EventCard = ({ event, type = 'default', handlePress }: Props) => {
  const TOTAL_APPLICANT_MENT = '명 신청중';
  const calcWidth =
    type === 'default' ? 200 : Dimensions.get('window').width / 2 - 30;

  return (
    <View style={[eventCardStyles.container, { width: calcWidth }]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handlePress(event.eventInfoId)}
      >
        <Image
          style={{
            ...eventCardStyles.image,
            width: calcWidth,
            height: calcWidth,
          }}
          source={{ uri: event.mainImageUrl }}
        />
      </TouchableOpacity>

      <SpaceLayout size={3}>
        <Text
          color={type === 'default' ? 'white' : 'main'}
          style={eventCardStyles.titleText}
          numberOfLines={1}
        >
          {event.eventTitle}
        </Text>
        <View style={eventCardStyles.iconText}>
          <Icon name="IconPlace" size={10} fill="main" />
          <Text variant="body3" numberOfLines={1}>
            {event.streetRoadAddress}
          </Text>
        </View>
        <View style={eventCardStyles.iconText}>
          <Icon name="IconUser" size={10} fill="main" />
          <Text variant="body3" numberOfLines={1}>
            {`${event.totalApplicantCount}${TOTAL_APPLICANT_MENT}`}
          </Text>
        </View>
      </SpaceLayout>

      <BookmarkButton
        isEventBookmarked={event.isBookmarked}
        eventInfoId={event.eventInfoId}
      />
    </View>
  );
};

export default EventCard;
