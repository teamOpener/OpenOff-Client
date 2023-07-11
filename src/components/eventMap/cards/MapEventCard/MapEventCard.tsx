import Text from 'components/common/Text/Text';
import React, { useId } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Event } from 'types/event';
import mapEventCardStyles from './MapEventCard.style';

interface Props {
  event: Event;
}

const MapEventCard = ({ event }: Props) => {
  const imageId = useId();
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
      >
        {event.images.map((image) => (
          <Image
            key={Math.random() * 100}
            style={mapEventCardStyles.eventImage}
            source={{ uri: image }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MapEventCard;
