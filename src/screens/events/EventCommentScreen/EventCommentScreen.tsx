import { useQueryClient } from '@tanstack/react-query';
import Spacing from 'components/common/Spacing/Spacing';
import { EventDetail } from 'components/eventDetail';
import {
  ChildCommentListItem,
  ParentCommentListItem,
} from 'components/eventDetail/atoms';
import EventEmptyLayout from 'components/eventDetail/layout/EventEmtpyLayout';
import KeyboardAvoidingScreenLayout from 'components/layout/KeyboardAvoidingScreenLayout/KeyboardAvoidingScreenLayout';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import CommentRowSkeleton from 'components/suspense/skeleton/CommentRowSkeleton/CommentRowSkeleton';
import { StackMenu } from 'constants/app/menu';
import MENT_EVENT_DETAIL from 'constants/eventDetail/eventDetailMessage';
import queryKeys from 'constants/queries/queryKeys';
import usePullToRefresh from 'hooks/app/usePullToRefresh';
import useStackRoute from 'hooks/navigator/useStackRoute';
import { useChildComments, useParentComments } from 'hooks/queries/comment';
import { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import eventCommentScreenStyles from './EventCommentScreen.style';

const EventCommentScreen = () => {
  const queryClient = useQueryClient();
  const { params } = useStackRoute<StackMenu.EventComment>();
  const { data: parentComments, isLoading: isParentLoading } =
    useParentComments({
      eventInfoId: params.infoId,
    });

  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const flatParentComments = parentComments?.pages.flatMap(
    (page) => page.data.content,
  );

  const filterData = flatParentComments?.find(
    (comment) => comment.commentId === params.commentId,
  );

  const { data: childrenComments, isLoading: isChildLoading } =
    useChildComments({
      eventInfoId: params.infoId,
      commentId: params.commentId,
    });

  const refreshComments = () => {
    queryClient.invalidateQueries(
      queryKeys.commentKeys.childCommentsByEventInfoId(
        params.infoId,
        params.commentId,
      ),
    );
  };

  const { refreshing, onRefresh } = usePullToRefresh({
    callback: refreshComments,
  });

  return (
    <KeyboardAvoidingScreenLayout>
      {!filterData && (
        <EventEmptyLayout helpText={MENT_EVENT_DETAIL.ERROR.EMPTY_COMMENT} />
      )}

      {filterData && (
        <>
          <ScrollView
            style={eventCommentScreenStyles.scrollContainer}
            onScrollBeginDrag={() => setIsScrolling(false)}
            onScrollEndDrag={() => {
              setIsScrolling(true);
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {(isParentLoading || isChildLoading) && <CommentRowSkeleton />}

            <ParentCommentListItem
              eventInfoId={params.infoId}
              comment={filterData}
              mode="detail"
              isScrolling={isScrolling}
            />

            <Spacing height={15} />

            <SpaceLayout size={15}>
              {childrenComments?.map((child) => (
                <ChildCommentListItem key={child.commentId} comment={child} />
              ))}
            </SpaceLayout>
          </ScrollView>

          <EventDetail.CommentInput
            eventInfoId={params.infoId}
            mode="child"
            parentId={filterData.commentId}
          />
        </>
      )}
    </KeyboardAvoidingScreenLayout>
  );
};

export default EventCommentScreen;
