import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors } from 'styles/theme';
import eventRowCardSkeletonStyles from './EventRowCardSkeleton.style';

const EventRowCardSkeleton = () => {
  return (
    <View style={eventRowCardSkeletonStyles.container}>
      <SkeletonPlaceholder backgroundColor={colors.grey}>
        <View style={eventRowCardSkeletonStyles.skeletonContainer}>
          <View style={eventRowCardSkeletonStyles.image} />
          <View style={eventRowCardSkeletonStyles.eventInfo}>
            <View style={eventRowCardSkeletonStyles.fieldBox} />
            <View style={eventRowCardSkeletonStyles.eventTitle} />
            <View style={eventRowCardSkeletonStyles.contents} />
            <View style={eventRowCardSkeletonStyles.subInfoText} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default EventRowCardSkeleton;
