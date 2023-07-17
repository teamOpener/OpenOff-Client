import CarouselCard from 'components/home/cards/CarouselCard/CarouselCard';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { CarouselElement } from 'types/apps/carousel';

interface Props<T> {
  carouselData: T[];
}

const CommonCarousel = <T extends CarouselElement>({
  carouselData,
}: Props<T>) => {
  return (
    <Carousel
      loop
      autoPlay
      autoPlayInterval={2000}
      style={{ width: '100%', marginTop: 40 }}
      width={Dimensions.get('window').width - 50}
      height={300}
      vertical={false}
      data={carouselData}
      renderItem={({ item, index }) => (
        <CarouselCard<T> key={index} item={item} index={index} />
      )}
    />
  );
};

export default CommonCarousel;
