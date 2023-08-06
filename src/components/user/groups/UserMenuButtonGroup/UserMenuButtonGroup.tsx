import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import React from 'react';
import { Pressable, View } from 'react-native';
import userMenuButtonGroupStyles from './UserMenuButtonGroup.style';

const UserMenuButtonGroup = () => {
  return (
    <View style={userMenuButtonGroupStyles.container}>
      <Pressable style={userMenuButtonGroupStyles.menuButton}>
        <Icon name="IconVoidTicket" size={30} fill="white" />
        <Text variant="bodySB" color="white">
          내 티켓
        </Text>
      </Pressable>
      <Pressable style={userMenuButtonGroupStyles.menuButton}>
        <Icon name="IconBookmark" size={30} fill="white" />
        <Text variant="bodySB" color="white">
          스크랩
        </Text>
      </Pressable>
      <Pressable style={userMenuButtonGroupStyles.menuButton}>
        <Icon name="IconCongrates" size={30} fill="white" />
        <Text variant="bodySB" color="white">
          주최 이벤트
        </Text>
      </Pressable>
      <Pressable style={userMenuButtonGroupStyles.menuButton}>
        <Icon name="IconComment" size={30} fill="white" />
        <Text variant="bodySB" color="white">
          내가 쓴 댓글
        </Text>
      </Pressable>
    </View>
  );
};

export default UserMenuButtonGroup;
