import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors } from 'styles/theme';
import alertCardSkeletonStyles from './AlertCardSkeleton.style';

const AlertCardSkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor={colors.grey}>
      <View style={alertCardSkeletonStyles.container}>
        <View style={alertCardSkeletonStyles.iconPlace} />
        <View style={alertCardSkeletonStyles.alertInfo}>
          <View style={alertCardSkeletonStyles.alertTitle} />
          <View style={alertCardSkeletonStyles.alertDate} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default AlertCardSkeleton;
