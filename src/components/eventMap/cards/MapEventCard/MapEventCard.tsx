import Text from 'components/common/Text/Text';
import { getFieldName } from 'constants/code';
import useNavigator from 'hooks/navigator/useNavigator';
import { memo } from 'react';
import { Dimensions, Image, Pressable, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { MapEvent } from 'types/event';
import mapEventCardStyles from './MapEventCard.style';

interface Props {
  event: MapEvent;
  distance: number;
}

const MapEventCard = ({ event, distance }: Props) => {
  const { stackNavigation } = useNavigator();
  const handleShowDetailEventInfo = () => {
    stackNavigation.navigate('EventDetail', {
      id: event.id,
    });
  };

  return (
    <View style={mapEventCardStyles.container}>
      <View style={mapEventCardStyles.textContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          variant="h3"
          color="white"
          style={mapEventCardStyles.textMargin}
        >
          {event.title}
        </Text>
        <View style={mapEventCardStyles.eventFieldContainer}>
          {event.fieldTypeList?.map((field, _idx) => (
            <Text variant="body2" color="grey" key={field + _idx}>
              {getFieldName(field)}
            </Text>
          ))}
        </View>
      </View>
      <View style={mapEventCardStyles.textContainer}>
        <Text
          variant="body2"
          color="grey"
          style={mapEventCardStyles.textMargin}
        >
          {distance}km
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
            <Pressable onPress={handleShowDetailEventInfo} key={index}>
              <Image
                key={index}
                style={mapEventCardStyles.eventImage}
                source={{ uri: item.imageUrl }}
              />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default memo(MapEventCard);
