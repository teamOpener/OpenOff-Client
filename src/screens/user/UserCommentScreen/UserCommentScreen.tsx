import React from 'react';
import { View } from 'react-native';
import UserCommentCard from 'components/user/cards/UserCommentCard/UserCommentCard';
import userCommentScreenStyles from './UserCommentScreen.style';

const UserCommentScreen = () => {
  const handleArrowPress = () => {
    return false;
  };
  return (
    <View style={userCommentScreenStyles.container}>
      {/* {userComment.map((comment) => (
        <UserCommentCard
          key={comment.id}
          handleArrowPress={handleArrowPress}
          comment={comment}
        />
      ))} */}
    </View>
  );
};

export default UserCommentScreen;
