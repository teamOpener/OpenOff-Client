import Image from 'components/common/Image/Image';
import { ImageUrlList } from 'models/event/entity/ImageUrlList';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { layouts } from 'styles/theme';

interface Props {
  images: ImageUrlList[];
}

const PosterCarousel = ({ images }: Props) => {
  const width = Dimensions.get('window').width - layouts.PADDING * 2;

  return (
    <Carousel
      loop
      autoPlay
      autoPlayInterval={2000}
      width={width}
      height={width}
      panGestureHandlerProps={{ minDist: 30 }}
      data={images}
      renderItem={({ item, index }) => (
        // TODO: 미리보기
        <Image
          key={index}
          source={{ uri: item.imageUrl }}
          style={{
            width,
            height: width,
          }}
        />
      )}
    />
  );
};

export default PosterCarousel;
