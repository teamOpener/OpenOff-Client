import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import posterCarouselSkeletonStyles from './PosterCarouselSkeleton.style';

const PosterCarouselSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View>
        <View style={posterCarouselSkeletonStyles.container} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default PosterCarouselSkeleton;
