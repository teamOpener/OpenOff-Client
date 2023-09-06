import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import MENT_EVENT_DETAIL from 'constants/eventDetail/eventDetailMessage';
import dayjs from 'dayjs';
import { ChildCommentInfoResponseDto } from 'models/comment/response/ChildCommentInfoResponseDto';
import childCommentListItemStyles from './ChildCommentListItem.style';

interface Props {
  comment: ChildCommentInfoResponseDto;
}

const ChildCommentListItem = ({ comment }: Props) => {
  return (
    <SpaceLayout
      direction="row"
      size={8}
      style={childCommentListItemStyles.full}
    >
      <Icon name="IconReply" size={20} fill="grey" />
      <SpaceLayout size={5} style={childCommentListItemStyles.full}>
        <Text style={childCommentListItemStyles.contentText}>
          {comment.content}
        </Text>
        <SpaceLayout direction="row" size={5}>
          <Text
            style={childCommentListItemStyles.nickName}
            color={comment.isStaff ? 'main' : 'white'}
          >
            {comment.isStaff ? MENT_EVENT_DETAIL.MAIN.HOST : comment.nickname}
          </Text>
          <Text style={childCommentListItemStyles.dateText} color="grey">
            {dayjs(comment.createdAt).format('YYYY.MM.DD')}
          </Text>
        </SpaceLayout>
      </SpaceLayout>
    </SpaceLayout>
  );
};

export default ChildCommentListItem;
