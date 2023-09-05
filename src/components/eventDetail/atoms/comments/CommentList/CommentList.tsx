import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import CommentRowSkeleton from 'components/suspense/skeleton/CommentRowSkeleton/CommentRowSkeleton';
import MENT_EVENT_DETAIL from 'constants/eventDetail/eventDetailMessage';
import { useParentComments } from 'hooks/queries/comment';
import { FlatList, View } from 'react-native';
import ParentCommentListItem from '../ParentCommentListItem/ParentCommentListItem';
import commentListStyles from './CommentList.style';

interface Props {
  eventInfoId: number;
  isScrolling: boolean;
}

const CommentList = ({ eventInfoId, isScrolling }: Props) => {
  const {
    data: parentComments,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useParentComments({
    eventInfoId,
  });

  const flatParentComments = parentComments?.pages.flatMap(
    (page) => page.data.content,
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemSeparatorComponent = () => <Spacing height={20} />;

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (!flatParentComments) {
    return null;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {flatParentComments.length ? (
        <FlatList
          data={flatParentComments?.reverse()}
          ItemSeparatorComponent={ItemSeparatorComponent}
          onEndReachedThreshold={0.2}
          onEndReached={onEndReached}
          scrollEnabled={false}
          contentContainerStyle={commentListStyles.contentContainer}
          renderItem={({ item }) => (
            <ParentCommentListItem
              key={item.commentId}
              eventInfoId={eventInfoId}
              comment={item}
              isScrolling={isScrolling}
            />
          )}
          ListFooterComponent={
            hasNextPage || isLoading ? (
              <SpaceLayout size={20}>
                <CommentRowSkeleton />
                <CommentRowSkeleton />
              </SpaceLayout>
            ) : null
          }
        />
      ) : (
        <View style={commentListStyles.emptyContainer}>
          <Text variant="body2" style={commentListStyles.emptyText}>
            {MENT_EVENT_DETAIL.COMMENT.EMPTY_COMMENT}
          </Text>
        </View>
      )}
    </>
  );
};

export default CommentList;
