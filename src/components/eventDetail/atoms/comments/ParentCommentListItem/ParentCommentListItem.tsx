import i18n from 'locales';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import { StackMenu } from 'constants/app/menu';
import dayjs from 'dayjs';
import useDialog from 'hooks/app/useDialog';
import useNavigator from 'hooks/navigator/useNavigator';
import { useReportComment } from 'hooks/queries/comment';
import { ParentCommentInfoResponseDto } from 'models/comment/response/ParentCommentInfoResponseDto';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import { useAuthorizeStore } from 'stores/Authorize';
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
  const { isLogin } = useAuthorizeStore();

  const [showDeclarationButton, setShowDeclarationButton] =
    useState<boolean>(false);

  const handleChildComment = () => {
    if (!isLogin) {
      openDialog({
        type: 'confirm',
        text: i18n.t('need_to_login'),
        apply: () => {
          stackNavigation.navigate('Login');
        },
        applyText: i18n.t('yes'),
        closeText: i18n.t('no'),
      });
      return;
    }
    stackNavigation.navigate(StackMenu.EventComment, {
      infoId: eventInfoId,
      commentId: comment.commentId,
    });
  };

  const handleSuccessReport = () => {
    setShowDeclarationButton(false);
    openDialog({
      type: 'success',
      text: i18n.t('event_detail.comment_report'),
    });
  };

  const handleErrorReport = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? i18n.t('default_error_message'),
    });
  };

  const { mutateAsync: reportComment, isLoading } = useReportComment(
    handleSuccessReport,
    handleErrorReport,
  );

  const handleDeclaration = async () => {
    if (!isLogin) {
      openDialog({
        type: 'warning',
        text: i18n.t('need_to_login'),
        apply: () => {
          stackNavigation.navigate('Login');
        },
        applyText: i18n.t('yes'),
        closeText: i18n.t('no'),
      });
      return;
    }
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
              {comment.isStaff ? i18n.t('host') : comment.nickname}
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
                  {i18n.t('event_detail.posting_reply')}
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
            {i18n.t('event_detail.read_more_replies', {
              childCount: comment.childCount,
            })}
          </Text>
        </TouchableOpacity>
      )}
    </SpaceLayout>
  );
};

export default ParentCommentListItem;
