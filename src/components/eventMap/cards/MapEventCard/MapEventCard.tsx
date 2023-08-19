import Text from 'components/common/Text/Text';
import { Dimensions, Image, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { MapEvent } from 'types/event';
import mapEventCardStyles from './MapEventCard.style';

interface Props {
  event: MapEvent;
}

const MapEventCard = ({ event }: Props) => {
  return (
    <View style={mapEventCardStyles.container}>
      <View style={mapEventCardStyles.textContainer}>
        <Text variant="h3" color="white" style={mapEventCardStyles.textMargin}>
          {event.title}
        </Text>
        <Text variant="body2" color="grey">
          {event.fieldTypes}
        </Text>
      </View>
      <View style={mapEventCardStyles.textContainer}>
        <Text
          variant="body2"
          color="grey"
          style={mapEventCardStyles.textMargin}
        >
          {event.distance}km
        </Text>
        <Text variant="body2" color="white">
          {`${event.streetLoadAddress} ${event.detailAddress}`}
        </Text>
      </View>
      <View style={mapEventCardStyles.imageContainer}>
        <Carousel
          width={124}
          height={114}
          loop={false}
          overscrollEnabled={false}
          style={{ width: Dimensions.get('window').width - 20 }}
          panGestureHandlerProps={{ minDist: 20 }}
          data={event.imageList}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              style={mapEventCardStyles.eventImage}
              source={{ uri: item.imageUrl }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default MapEventCard;
