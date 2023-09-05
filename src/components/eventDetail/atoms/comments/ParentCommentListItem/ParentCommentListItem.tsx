import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import API_ERROR_MESSAGE from 'constants/app/errorMessage';
import { StackMenu } from 'constants/app/menu';
import MENT_EVENT_DETAIL from 'constants/eventDetail/eventDetailMessage';
import dayjs from 'dayjs';
import useDialog from 'hooks/app/useDialog';
import useNavigator from 'hooks/navigator/useNavigator';
import { useReportComment } from 'hooks/queries/comment';
import { ParentCommentInfoResponseDto } from 'models/comment/response/ParentCommentInfoResponseDto';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import DeclarationButton from '../DeclarationButton/DeclarationButton';
import parentCommentListItemStyles from './ParentCommentListItem.style';

type ParentCommentMode = 'count' | 'detail';

interface Props {
  eventInfoId: number;
  comment: ParentCommentInfoResponseDto;
  mode?: ParentCommentMode;
  isScrolling?: boolean;
}

const ParentCommentListItem = ({
  eventInfoId,
  comment,
  mode = 'count',
  isScrolling = false,
}: Props) => {
  const { stackNavigation } = useNavigator();
  const { openDialog } = useDialog();

  const [showDeclarationButton, setShowDeclarationButton] =
    useState<boolean>(false);

  const handleChildComment = () => {
    stackNavigation.navigate(StackMenu.EventComment, {
      infoId: eventInfoId,
      commentId: comment.commentId,
    });
  };

  const handleSuccessReport = () => {
    setShowDeclarationButton(false);
    openDialog({
      type: 'success',
      text: MENT_EVENT_DETAIL.COMMENT.COMMENT_REPORT,
    });
  };

  const handleErrorReport = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? API_ERROR_MESSAGE.DEFAULT,
    });
  };

  const { mutateAsync: reportComment, isLoading } = useReportComment(
    handleSuccessReport,
    handleErrorReport,
  );

  const handleDeclaration = async () => {
    await reportComment({ commentId: comment.commentId });
  };

  useEffect(() => {
    if (isScrolling) {
      setShowDeclarationButton(false);
    }
  }, [isScrolling]);

  return (
    <SpaceLayout size={10} style={parentCommentListItemStyles.full}>
      {isLoading && (
        <WithIconLoading isActive backgroundColor={colors.background} />
      )}
      <SpaceLayout
        direction="row"
        size={8}
        style={parentCommentListItemStyles.container}
      >
        <SpaceLayout size={6} style={parentCommentListItemStyles.left}>
          <SpaceLayout
            direction="row"
            size={10}
            style={parentCommentListItemStyles.alignItems}
          >
            <Text
              style={[
                parentCommentListItemStyles.nickName,
                { color: comment.isStaff ? colors.main : colors.white },
              ]}
            >
              {comment.isStaff ? MENT_EVENT_DETAIL.MAIN.HOST : comment.nickname}
            </Text>
            <Text style={parentCommentListItemStyles.content}>
              {comment.content}
            </Text>
          </SpaceLayout>

          <SpaceLayout
            direction="row"
            size={5}
            style={parentCommentListItemStyles.alignItems}
          >
            <Text color="grey" style={parentCommentListItemStyles.dateText}>
              {dayjs(comment.createdAt).format('YYYY.MM.DD')}
            </Text>

            {mode === 'count' && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleChildComment}
              >
                <Text
                  color="grey"
                  style={parentCommentListItemStyles.replyButtonText}
                >
                  {MENT_EVENT_DETAIL.COMMENT.POSTING_REPLY}
                </Text>
              </TouchableOpacity>
            )}
          </SpaceLayout>
        </SpaceLayout>

        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowDeclarationButton(!showDeclarationButton)}
          >
            <Icon name="IconMore" size={20} fill="white" />
          </TouchableOpacity>
          {showDeclarationButton && (
            <DeclarationButton onPress={handleDeclaration} />
          )}
        </View>
      </SpaceLayout>

      {mode === 'count' && comment.childCount > 0 && (
        <TouchableOpacity style={parentCommentListItemStyles.replyCountButton}>
          <Text
            color="point"
            style={parentCommentListItemStyles.replyCountText}
            onPress={handleChildComment}
          >
            {MENT_EVENT_DETAIL.COMMENT.READ_MORE_REPLIES(comment.childCount)}
          </Text>
        </TouchableOpacity>
      )}
    </SpaceLayout>
  );
};

export default ParentCommentListItem;
