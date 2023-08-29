import { Dimensions, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors } from 'styles/theme';
import eventCardSkeletonStyles from './EventCardSkeleton.style';

interface Props {
  type?: 'default' | 'scrap';
}

const EventCardSkeleton = ({ type = 'default' }: Props) => {
  const calcWidth =
    type === 'default' ? 200 : Dimensions.get('window').width / 2 - 35;
  return (
    <SkeletonPlaceholder backgroundColor={colors.grey}>
      <View style={eventCardSkeletonStyles.container}>
        <View
          style={{
            ...eventCardSkeletonStyles.image,
            width: calcWidth,
            height: calcWidth,
          }}
        />
        <View style={eventCardSkeletonStyles.title} />
        <View style={eventCardSkeletonStyles.date} />
        <View style={eventCardSkeletonStyles.contents} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default EventCardSkeleton;
