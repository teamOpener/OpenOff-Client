import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import React from 'react';
import { Pressable, View } from 'react-native';
import useNavigator from 'hooks/navigator/useNavigator';
import userMenuButtonGroupStyles from './UserMenuButtonGroup.style';

const UserMenuButtonGroup = () => {
  const { stackNavigation, tabNavigation } = useNavigator();
  const MY_TICKET = '내 티켓';
  const MY_SCRAP = '스크랩';
  const HOST_EVENT = '주최 이벤트';
  const MY_COMMENT = '내가 쓴 댓글';

  const handleShowScrap = () => {
    stackNavigation.navigate('Scrap');
  };

  const handleShowMyTicket = () => {
    tabNavigation.navigate('UserEvent');
  };

  return (
    <View style={userMenuButtonGroupStyles.container}>
      <Pressable
        style={userMenuButtonGroupStyles.menuButton}
        onPress={handleShowMyTicket}
      >
        <Icon name="IconVoidTicket" size={30} fill="white" />
        <Text variant="bodySB" color="white">
          {MY_TICKET}
        </Text>
      </Pressable>
      <Pressable
        onPress={handleShowScrap}
        style={userMenuButtonGroupStyles.menuButton}
      >
        <Icon name="IconBookmark" size={30} fill="white" />
        <Text variant="bodySB" color="white">
          {MY_SCRAP}
        </Text>
      </Pressable>
      <Pressable
        style={userMenuButtonGroupStyles.menuButton}
        onPress={handleShowMyTicket}
      >
        <Icon name="IconCongrates" size={30} fill="white" />
        <Text variant="bodySB" color="white">
          {HOST_EVENT}
        </Text>
      </Pressable>
      <Pressable style={userMenuButtonGroupStyles.menuButton}>
        <Icon name="IconComment" size={30} fill="white" />
        <Text variant="bodySB" color="white">
          {MY_COMMENT}
        </Text>
      </Pressable>
    </View>
  );
};

export default UserMenuButtonGroup;
