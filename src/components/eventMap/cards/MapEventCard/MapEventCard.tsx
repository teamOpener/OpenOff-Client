import Text from 'components/common/Text/Text';
import { memo } from 'react';
import { Image, View } from 'react-native';
import { Event } from 'types/event';
import mapEventCardStyles from './MapEventCard.style';

interface Props {
  event: Event;
}

const MapEventCard = ({ event }: Props) => {
  return (
    <View style={mapEventCardStyles.container}>
      <View style={mapEventCardStyles.textContainer}>
        <Text variant="h3" color="white" style={mapEventCardStyles.textMargin}>
          {event.name}
        </Text>
        <Text variant="body2" color="grey">
          {event.eventType}
        </Text>
      </View>
      <View style={mapEventCardStyles.textContainer}>
        <Text
          variant="body2"
          color="grey"
          style={mapEventCardStyles.textMargin}
        >
          22km
        </Text>
        <Text variant="body2" color="white">
          {event.place}
        </Text>
      </View>
      <View style={mapEventCardStyles.imageContainer}>
        {event.images.slice(0, 3).map((image) => (
          <Image
            key={Math.random() * 100}
            style={mapEventCardStyles.eventImage}
            source={{ uri: image }}
          />
        ))}
      </View>
    </View>
  );
};

export default memo(MapEventCard);
