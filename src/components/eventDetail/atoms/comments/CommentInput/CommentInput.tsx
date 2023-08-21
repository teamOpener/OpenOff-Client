import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { colors } from 'styles/theme';
import Text from 'components/common/Text/Text';
import {
  usePostChildComment,
  usePostParentComment,
} from 'hooks/queries/comment';
import { ChildCommentWriteRequestDto } from 'models/comment/request/ChildCommentWriteRequestDto';
import { ParentCommentWriteRequestDto } from 'models/comment/request/ParentCommentWriteRequestDto';
import useDialog from 'hooks/app/useDialog';
import API_ERROR_MESSAGE from 'constants/errorMessage';
import queryKeys from 'constants/queryKeys';
import { ApiErrorResponse } from 'types/ApiResponse';
import commentInputStyles from './CommentInput.style';

type CommentInputType = 'parent' | 'child';

interface Props {
  eventInfoId: number;
  mode?: CommentInputType;
  parentId?: number;
}

const CommentInput = ({ eventInfoId, mode = 'parent', parentId }: Props) => {
  const { openDialog } = useDialog();
  const queryClient = useQueryClient();

  const [comment, setComment] = useState<string>('');

  const handleSuccessPostComment = () => {
    queryClient.invalidateQueries(
      queryKeys.commentKeys.byEventInfoId(eventInfoId),
    );
    setComment('');
    openDialog({
      type: 'success',
      text: '댓글을 등록했습니다!',
    });
  };

  const handleErrorPostComment = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? API_ERROR_MESSAGE.DEFAULT,
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
    if (mode === 'parent') {
      await handleRegisterParentComment();
      return;
    }
    await handleRegisterChildComment();
  };

  return (
    <View style={commentInputStyles.absoluteContainer}>
      <View style={commentInputStyles.inputWrapper}>
        <TextInput
          style={commentInputStyles.inputText}
          placeholder={
            mode === 'child' ? '대댓글을 남겨보세요.' : '댓글을 남겨보세요.'
          }
          placeholderTextColor={colors.grey}
          value={comment}
          onChangeText={setComment}
        />

        <TouchableOpacity
          disabled={!comment}
          activeOpacity={0.8}
          style={[
            commentInputStyles.button,
            !!comment && commentInputStyles.activeButton,
          ]}
          onPress={handleRegisterComment}
        >
          <Text
            color={comment ? 'white' : 'grey'}
            style={commentInputStyles.buttonText}
          >
            등록
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentInput;
