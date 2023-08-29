import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors } from 'styles/theme';
import commentRowSkeletonStyles from './CommentRowSkeleton.style';

const CommentRowSkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor={colors.grey}>
      <View>
        <View style={commentRowSkeletonStyles.title} />
        <View style={commentRowSkeletonStyles.description} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default CommentRowSkeleton;
