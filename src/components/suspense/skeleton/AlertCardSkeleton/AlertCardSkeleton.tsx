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

/**
{!isLoading && (
  <View>
    <Icon
      name="IconTicketStar"
      fill="background"
      style={{ position: 'absolute', left: '50%', top: 20, zIndex: 10 }}
    />
    <Icon
      name="IconTicketStar"
      fill="background"
      size={20}
      style={{ position: 'absolute', left: '30%', top: 16, zIndex: 10 }}
    />
    <AlertCardSkeleton />
  </View>
)}
 */
