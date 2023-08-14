import { useQueryClient } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import BookmarkButton from 'components/home/buttons/BookmarkButton/BookmarkButton';
import queryKeys from 'constants/queryKeys';
import fieldData from 'data/lists/fieldData';
import { useContext, useId } from 'react';
import { Image, Pressable, View } from 'react-native';
import { Event } from 'types/event';
import DialogContext from 'utils/DialogContext';
import eventRowCardStyles from './EventRowCard.style';

interface Props {
  event: Event;
  handleEventPress: (eventId: number) => void;
}

const EventRowCard = ({ event, handleEventPress }: Props) => {
  const queryClient = useQueryClient();

  const handleSuccessBookmark = () => {
    queryClient.invalidateQueries(queryKeys.bookmarkKeys.list);
    queryClient.invalidateQueries(queryKeys.eventKeys.personalList);
    queryClient.invalidateQueries(queryKeys.eventKeys.vogueList);
  };

  const { openDialog } = useContext(DialogContext);
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
          {event.fieldTypes.map((field, _id) => (
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
        <Text style={eventRowCardStyles.eventTitle}>{event.eventTitle}</Text>
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
      <BookmarkButton
        eventInfoId={event.eventInfoId}
        isEventBookmarked={event.isBookmarked}
        type="rowEvent"
      />
    </View>
  );
};

export default EventRowCard;
