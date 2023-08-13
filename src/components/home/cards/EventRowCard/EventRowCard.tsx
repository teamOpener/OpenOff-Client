import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { Image, View } from 'react-native';
import { Event } from 'types/event';
import fieldData from 'data/lists/fieldData';
import { useId } from 'react';
import eventRowCardStyles from './EventRowCard.style';

interface Props {
  event: Event;
}

const EventRowCard = ({ event }: Props) => {
  const city = event.streetRoadAddress.split(' ');
  const fieldId = useId();
  return (
    <View style={eventRowCardStyles.container}>
      <Image
        style={eventRowCardStyles.image}
        source={{ uri: event.mainImageUrl }}
      />
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
    </View>
  );
};

export default EventRowCard;
