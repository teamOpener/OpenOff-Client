import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import BookmarkButton from 'components/home/buttons/BookmarkButton/BookmarkButton';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import MENT_HOME from 'constants/home/homeMessage';
import fieldData from 'data/lists/fieldData';
import MainTapEventInfoResponseDto from 'models/event/response/MainTapEventInfoResponseDto';
import {
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import { layouts } from 'styles/theme';
import eventCardStyles from './EventCard.style';

interface Props {
  event: MainTapEventInfoResponseDto;
  type?: 'default' | 'scrap' | 'bookmark' | 'popular' | 'category';
  handlePress: (eventId: number) => void;
}

const EventCard = ({ event, type = 'default', handlePress }: Props) => {
  const city = event.streetRoadAddress.split(' ');
  const calcWidth =
    type === 'default'
      ? 200
      : Dimensions.get('window').width / 2 - layouts.PADDING - 10;

  return (
    <View style={[eventCardStyles.container, { width: calcWidth }]}>
      <TouchableOpacity
        style={eventCardStyles.imageContainer}
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
        {type !== 'category' && (
          <View style={eventCardStyles.fieldBox}>
            <Text variant="bodySB" color="darkGrey">
              {
                fieldData.find(
                  (fieldElement) => fieldElement.value === event.fieldTypes[0],
                )?.label
              }
            </Text>
          </View>
        )}
        {type !== 'scrap' && (
          <BookmarkButton
            isEventBookmarked={type === 'bookmark' ? true : event.isBookmarked}
            type={type}
            eventInfoId={event.eventInfoId}
          />
        )}
      </TouchableOpacity>

      <SpaceLayout size={3}>
        <Pressable onPress={() => handlePress(event.eventInfoId)}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            color={type === 'default' ? 'white' : 'main'}
            style={{ ...eventCardStyles.titleText, width: calcWidth }}
          >
            {event.eventTitle}
          </Text>
        </Pressable>
        <Text variant="body3" numberOfLines={1}>
          {event.eventDate}
        </Text>
        <View style={eventCardStyles.iconText}>
          <View style={eventCardStyles.iconText}>
            <Icon name="IconPlace" size={10} fill="main" />
            <Text variant="body3" numberOfLines={1}>
              {city[1]}
            </Text>
          </View>
          <View style={eventCardStyles.iconText}>
            <Icon name="IconUser" size={10} fill="main" />
            <Text variant="body3" numberOfLines={1}>
              {`${event.totalApplicantCount}${MENT_HOME.MAIN.TOTAL_APPLICANT_MENT}`}
            </Text>
          </View>
        </View>
      </SpaceLayout>
    </View>
  );
};

export default EventCard;
