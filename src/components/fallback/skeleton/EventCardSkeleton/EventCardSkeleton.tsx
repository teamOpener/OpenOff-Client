import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors } from 'styles/theme';
import eventCardSkeletonStyles from './EventCardSkeleton.style';

const EventCardSkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor={colors.grey}>
      <View style={eventCardSkeletonStyles.container}>
        <View style={eventCardSkeletonStyles.image} />
        <View style={eventCardSkeletonStyles.title} />
        <View style={eventCardSkeletonStyles.date} />
        <View style={eventCardSkeletonStyles.contents} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default EventCardSkeleton;
