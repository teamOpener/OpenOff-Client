import i18n from 'locales';
import { useQueryClient } from '@tanstack/react-query';
import Text from 'components/common/Text/Text';
import queryKeys from 'constants/queries/queryKeys';
import useDialog from 'hooks/app/useDialog';
import {
  usePostChildComment,
  usePostParentComment,
} from 'hooks/queries/comment';
import { ChildCommentWriteRequestDto } from 'models/comment/request/ChildCommentWriteRequestDto';
import { ParentCommentWriteRequestDto } from 'models/comment/request/ParentCommentWriteRequestDto';
import { useState } from 'react';
import { Keyboard, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import { useAuthorizeStore } from 'stores/Authorize';
import commentInputStyles from './CommentInput.style';

type CommentInputType = 'parent' | 'child';

interface Props {
  eventInfoId: number;
  mode?: CommentInputType;
  parentId?: number;
}

const CommentInput = ({ eventInfoId, mode = 'parent', parentId }: Props) => {
  const { openDialog } = useDialog();
  const { isLogin } = useAuthorizeStore();
  const queryClient = useQueryClient();

  const [comment, setComment] = useState<string>('');

  const handleSuccessPostComment = () => {
    Keyboard.dismiss();
    queryClient.invalidateQueries(
      queryKeys.commentKeys.byEventInfoId(eventInfoId),
    );
    setComment('');
    openDialog({
      type: 'success',
      text: i18n.t('event_detail.comment_success'),
    });
  };

  const handleErrorPostComment = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? i18n.t('default_error_message'),
    });
  };

  const { mutateAsync: postParentComment } = usePostParentComment(
    handleSuccessPostComment,
    handleErrorPostComment,
  );

  const { mutateAsync: postChildComment } = usePostChildComment(
    handleSuccessPostComment,
    handleErrorPostComment,
  );

  const handleRegisterParentComment = async () => {
    const data: ParentCommentWriteRequestDto = {
      eventInfoId,
      content: comment,
    };

    await postParentComment(data);
  };

  const handleRegisterChildComment = async () => {
    if (!parentId) return;

    const data: ChildCommentWriteRequestDto = {
      eventInfoId,
      parentId,
      content: comment,
    };

    await postChildComment(data);
  };

  const handleRegisterComment = async () => {
    if (!isLogin) {
      return;
    }
    if (mode === 'parent') {
      await handleRegisterParentComment();
      return;
    }
    await handleRegisterChildComment();
  };

  const childDiscriminator =
    mode === 'child'
      ? i18n.t('event_detail.child_comment_input')
      : i18n.t('event_detail.comment_input');

  const loginDiscriminator = !isLogin
    ? i18n.t('user_need_to_login')
    : childDiscriminator;

  return (
    <View style={commentInputStyles.inputWrapper}>
      <TextInput
        style={commentInputStyles.inputText}
        placeholder={loginDiscriminator}
        placeholderTextColor={colors.grey}
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity
        disabled={!comment}
        activeOpacity={0.8}
        style={[
          commentInputStyles.button,
          !!comment && isLogin && commentInputStyles.activeButton,
        ]}
        onPress={handleRegisterComment}
      >
        <Text
          color={comment && isLogin ? 'white' : 'grey'}
          style={commentInputStyles.buttonText}
        >
          {i18n.t('submit')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentInput;
