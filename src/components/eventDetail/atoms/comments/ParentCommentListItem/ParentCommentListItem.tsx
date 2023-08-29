import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from 'styles/theme';
import Text from 'components/common/Text/Text';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import { ParentCommentInfoResponseDto } from 'models/comment/response/ParentCommentInfoResponseDto';
import useNavigator from 'hooks/navigator/useNavigator';
import { StackMenu } from 'constants/menu';
import Icon from 'components/common/Icon/Icon';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { useReportComment } from 'hooks/queries/comment';
import useDialog from 'hooks/app/useDialog';
import { ApiErrorResponse } from 'types/ApiResponse';
import API_ERROR_MESSAGE from 'constants/errorMessage';
import parentCommentListItemStyles from './ParentCommentListItem.style';
import DeclarationButton from '../DeclarationButton/DeclarationButton';

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
      text: '댓글을 신고했습니다!',
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
              {comment.isStaff ? '주최자' : comment.nickname}
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
                  답글달기
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
          >{`- 답글 ${comment.childCount}개 더 보기`}</Text>
        </TouchableOpacity>
      )}
    </SpaceLayout>
  );
};

export default ParentCommentListItem;
