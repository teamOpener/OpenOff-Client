import CarouselCard from 'components/home/cards/CarouselCard/CarouselCard';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useGetBannerImages } from 'hooks/queries/banner';
import advertisementCarouselStyles from './AdvertisementCarousel.style';

const AdvertisementCarousel = () => {
  const { data: bannerImageLists } = useGetBannerImages();

  return (
    <Carousel
      loop
      autoPlay
      autoPlayInterval={2000}
      style={advertisementCarouselStyles.container}
      width={Dimensions.get('window').width - 20}
      height={280}
      vertical={false}
      data={bannerImageLists ?? []}
      renderItem={({ item, index }) => (
        <CarouselCard
          key={index}
          item={item}
          index={index}
          length={bannerImageLists ? bannerImageLists.length : 0}
        />
      )}
    />
  );
};

export default AdvertisementCarousel;
