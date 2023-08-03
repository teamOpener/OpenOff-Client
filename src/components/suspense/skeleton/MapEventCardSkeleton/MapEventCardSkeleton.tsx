import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors } from 'styles/theme';
import mapCardSkeletonStyles from './MapEventCardSkeleton.style';

const MapEventCardSkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor={colors.grey}>
      <View style={mapCardSkeletonStyles.container}>
        <View style={mapCardSkeletonStyles.title} />
        <View style={mapCardSkeletonStyles.contents} />
        <View style={mapCardSkeletonStyles.imageContainer}>
          {new Array(3).fill(1).map((_, _idx) => (
            <View key={_idx} style={mapCardSkeletonStyles.eventImage} />
          ))}
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default MapEventCardSkeleton;
