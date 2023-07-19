import CarouselCard from 'components/home/cards/CarouselCard/CarouselCard';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Advertisement } from 'types/apps/advertisement';
import commonCarouselStyles from './AdvertisementCarousel.style';

interface Props<T> {
  carouselData: T[];
}

const AdvertisementCarousel = <T extends Advertisement>({
  carouselData,
}: Props<T>) => {
  return (
    <Carousel
      loop
      autoPlay
      autoPlayInterval={2000}
      style={commonCarouselStyles.container}
      width={Dimensions.get('window').width - 25}
      height={300}
      vertical={false}
      data={carouselData}
      renderItem={({ item, index }) => (
        <CarouselCard<T>
          key={index}
          item={item}
          index={index}
          length={carouselData.length}
        />
      )}
    />
  );
};

export default AdvertisementCarousel;
