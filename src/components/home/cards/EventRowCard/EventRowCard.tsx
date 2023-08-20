import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import BookmarkButton from 'components/home/buttons/BookmarkButton/BookmarkButton';
import fieldData from 'data/lists/fieldData';
import useDialog from 'hooks/app/useDialog';
import { useId } from 'react';
import { Image, Pressable, View } from 'react-native';
import { Event } from 'types/event';
import eventRowCardStyles from './EventRowCard.style';

interface Props {
  event: Event;
  handleEventPress: (eventId: number) => void;
}

const EventRowCard = ({ event, handleEventPress }: Props) => {
  const { openDialog } = useDialog();
  const city = event.streetRoadAddress.split(' ');
  const fieldId = useId();

  const handlePress = () => {
    if (!event.bookmarkId && !event.eventInfoId) {
      openDialog({
        type: 'validate',
        text: '잘못된 접근입니다!',
      });
      return;
    }
    if (event.bookmarkId) {
      handleEventPress(event.bookmarkId);
      return;
    }
    if (event.eventInfoId) {
      handleEventPress(event.eventInfoId);
    }
  };

  return (
    <View style={eventRowCardStyles.container}>
      <Pressable onPress={() => handlePress()}>
        <Image
          style={eventRowCardStyles.image}
          source={{ uri: event.mainImageUrl }}
        />
      </Pressable>
      <View style={eventRowCardStyles.eventInfo}>
        <View style={eventRowCardStyles.fieldBoxContainer}>
          {event.fieldTypeList.map((field, _id) => (
            <View key={`${fieldId}${_id}`} style={eventRowCardStyles.fieldBox}>
              <Text variant="body3" color="darkGrey">
                {
                  fieldData.find((fieldElement) => fieldElement.value === field)
                    ?.label
                }
              </Text>
            </View>
          ))}
        </View>
        <Text style={eventRowCardStyles.eventTitle} numberOfLines={1}>
          {event.eventTitle}
        </Text>

        <Text variant="body3" color="background">
          {event.eventDate.substring(0, 10).replaceAll('-', '.')}
        </Text>
        <View style={eventRowCardStyles.subInfo}>
          <View style={eventRowCardStyles.subInfoText}>
            <Icon name="IconPlace" fill="main" size={10} />
            <Text variant="body3" color="background">
              {city[1]}
            </Text>
          </View>
          <View style={eventRowCardStyles.subInfoText}>
            <Icon name="IconUser" fill="main" size={10} />
            <Text variant="body3" color="background">
              {event.totalApplicantCount}
            </Text>
          </View>
        </View>
      </View>
      <View style={eventRowCardStyles.bookmarkButtonWrapper}>
        <BookmarkButton
          eventInfoId={event.eventInfoId}
          isEventBookmarked={event.isBookmarked}
          type="rowEvent"
        />
      </View>
    </View>
  );
};

export default EventRowCard;
