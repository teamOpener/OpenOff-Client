import CarouselCard from 'components/home/cards/CarouselCard/CarouselCard';
import CarouselCardSkeleton from 'components/suspense/skeleton/CarouselCardSkeleton/CarouselCardSkeleton';
import { useGetBannerImages } from 'hooks/queries/banner';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import advertisementCarouselStyles from './AdvertisementCarousel.style';

const AdvertisementCarousel = () => {
  const { data: bannerImageLists, isLoading } = useGetBannerImages();
  const SKELETON_ARRAY = ['empty'];

  return (
    <Carousel
      loop
      autoPlay
      autoPlayInterval={2000}
      style={advertisementCarouselStyles.container}
      width={Dimensions.get('window').width - 20}
      height={280}
      vertical={false}
      data={bannerImageLists ?? SKELETON_ARRAY}
      renderItem={({ item, index }) =>
        isLoading ? (
          <CarouselCardSkeleton />
        ) : (
          <CarouselCard
            key={index}
            item={item}
            index={index}
            length={bannerImageLists ? bannerImageLists.length : 0}
          />
        )
      }
    />
  );
};

export default AdvertisementCarousel;
