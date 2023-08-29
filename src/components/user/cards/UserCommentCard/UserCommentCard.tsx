import React from 'react';
import { View, Image, Pressable } from 'react-native';
import Text from 'components/common/Text/Text';
import UserComment from 'types/apps/comment';
import dayjs from 'dayjs';
import Icon from 'components/common/Icon/Icon';
import userCommentCardStyles from './UserCommentCard.style';

interface Props {
  comment: UserComment;
  handleArrowPress: () => void;
}

const UserCommentCard = ({ comment, handleArrowPress }: Props) => {
  return (
    <View style={userCommentCardStyles.container}>
      <View style={userCommentCardStyles.baseContainer}>
        <Image
          style={userCommentCardStyles.image}
          source={{ uri: comment.eventImage }}
        />
        <View style={userCommentCardStyles.commentInfo}>
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
      <Pressable onPress={handleArrowPress}>
        <Icon size={10} name="IconArrowRight" />
      </Pressable>
    </View>
  );
};

export default UserCommentCard;
