import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors } from 'styles/theme';
import carouselCardSkeletonStyles from './CarouselCardSkeleton.style';

const CarouselCardSkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor={colors.grey}>
      <View>
        <View style={carouselCardSkeletonStyles.container} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default CarouselCardSkeleton;
