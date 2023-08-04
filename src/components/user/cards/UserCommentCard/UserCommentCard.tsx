import React from 'react';
import { View, Image } from 'react-native';
import Text from 'components/common/Text/Text';
import UserComment from 'types/apps/comment';
import dayjs from 'dayjs';

interface Props {
  comment: UserComment;
}

const UserCommentCard = ({ comment }: Props) => {
  return (
    <View>
      <Image source={{ uri: comment.eventImage }} />
      <View>
        <Text variant="bodySB" color="main">
          {comment.eventName}
        </Text>
        <Text variant="body2" color="white">
          {comment.comment}
        </Text>
        <Text variant="body3" color="white">
          {dayjs(comment.regDate).format('YYYY.MM.DD')}
        </Text>
      </View>
    </View>
  );
};

export default UserCommentCard;
