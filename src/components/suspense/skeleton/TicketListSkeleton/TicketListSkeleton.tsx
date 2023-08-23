import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'components/common/Icon/Icon';
import { colors } from 'styles/theme';
import ticketListSkeletonStyles from './TicketListSkeleton.style';

const TicketListSkeleton = () => {
  return (
    <View style={ticketListSkeletonStyles.container}>
      <Icon
        name="IconTicketStar"
        fill="darkGrey"
        size={60}
        style={[
          ticketListSkeletonStyles.icon,
          ticketListSkeletonStyles.starIcon,
        ]}
      />
      <Icon
        name="IconTicketHeart"
        fill="darkGrey"
        size={50}
        style={[
          ticketListSkeletonStyles.icon,
          ticketListSkeletonStyles.heartIcon,
        ]}
      />
      <SkeletonPlaceholder backgroundColor={colors.grey}>
        <View style={ticketListSkeletonStyles.item} />
      </SkeletonPlaceholder>
    </View>
  );
};

export default TicketListSkeleton;
