import Text from 'components/common/Text/Text';
import field from 'data/lists/field';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Advertisement } from 'types/apps/advertisement';
import carouselCardStyle from './CarouselCard.style';

interface Props<T> {
  item: T;
  index: number;
  length: number;
}

const CarouselCard = <T extends Advertisement>({
  item,
  index,
  length,
}: Props<T>) => {
  return (
    <TouchableOpacity style={carouselCardStyle.container}>
      <ImageBackground
        style={carouselCardStyle.backgroundImage}
        source={{ uri: item.image }}
        resizeMode="cover"
      >
        <LinearGradient colors={['#19191900', '#191919AB', '#191919E5']}>
          <View style={carouselCardStyle.carouselInfo}>
            <Text variant="h3" color="white">
              {item.title}
            </Text>
            <View style={carouselCardStyle.fieldContainer}>
              <Text>
                {
                  field.find(
                    (fieldElement) => fieldElement.value === item.field,
                  )?.label
                }
              </Text>
            </View>
            <View style={carouselCardStyle.pageInfo}>
              <Text variant="body3" color="white">
                {index + 1}/{length}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CarouselCard;
