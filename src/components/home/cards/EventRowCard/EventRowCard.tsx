import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { Image, View } from 'react-native';
import { Event } from 'types/event';
import eventRowCardStyles from './EventRowCard.style';

interface Props {
  event: Event;
}

const EventRowCard = ({ event }: Props) => {
  const city = event.place.split(' ');
  return (
    <View style={eventRowCardStyles.container}>
      <Image
        style={eventRowCardStyles.image}
        source={{ uri: event.images[0] }}
      />
      <View style={eventRowCardStyles.eventInfo}>
        <View style={eventRowCardStyles.fieldBox}>
          <Text variant="body3" color="darkGrey">
            {event.eventType}
          </Text>
        </View>
        <Text style={eventRowCardStyles.eventTitle}>{event.name}</Text>
        <Text variant="body3" color="background">
          {event.date.substring(0, 10).replaceAll('-', '.')}
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
              {event.participant}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventRowCard;
