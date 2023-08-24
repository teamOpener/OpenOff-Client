import Text from 'components/common/Text/Text';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import carouselCardStyle from './CarouselCard.style';

interface Props {
  item: string;
  length: number;
  index: number;
}

const CarouselCard = ({ item, length, index }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={carouselCardStyle.container}>
      <ImageBackground
        style={carouselCardStyle.backgroundImage}
        source={{ uri: item }}
        resizeMode="cover"
      >
        <LinearGradient colors={['#19191900', '#191919AB', '#191919E5']}>
          <View style={carouselCardStyle.carouselInfo}>
            {/* <Text variant="h3" color="white">
              {item.title}
            </Text>
            <View style={carouselCardStyle.fieldContainer}>
              <Text variant="body3">
                {
                  fieldData.find(
                    (fieldElement) => fieldElement.value === item.field,
                  )?.label
                }
              </Text>
            </View> */}
            <View style={carouselCardStyle.pageInfo}>
              <Text style={carouselCardStyle.pageText} color="white">
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
