import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import MENT_USER from 'constants/user/userConstants';
import { UserEventTabItem } from 'constants/userEvent/participant/participantConstants';
import useNavigator from 'hooks/navigator/useNavigator';
import { Pressable, View } from 'react-native';
import userMenuButtonGroupStyles from './UserMenuButtonGroup.style';

const UserMenuButtonGroup = () => {
  const { stackNavigation, tabNavigation } = useNavigator();

  const handleShowScrap = () => {
    stackNavigation.navigate('Scrap');
  };

  const handleShowMyTicket = () => {
    tabNavigation.navigate('UserEvent', {
      tab: UserEventTabItem.PARTICIPANT,
    });
  };

  const handleShowMyHostEvent = () => {
    tabNavigation.navigate('UserEvent', {
      tab: UserEventTabItem.HOST,
    });
  };

  return (
    <View style={userMenuButtonGroupStyles.container}>
      <Pressable
        style={userMenuButtonGroupStyles.menuButton}
        onPress={handleShowMyTicket}
      >
        <Icon name="IconVoidTicket" size={30} fill="white" />
        <Text variant="bodySB" color="white">
          {MENT_USER.MAIN.MY_TICKET}
        </Text>
      </Pressable>
      <Pressable
        onPress={handleShowScrap}
        style={userMenuButtonGroupStyles.menuButton}
      >
        <Icon name="IconBookmark" size={30} fill="white" />
        <Text variant="bodySB" color="white">
          {MENT_USER.MAIN.MY_SCRAP}
        </Text>
      </Pressable>
      <Pressable
        style={userMenuButtonGroupStyles.menuButton}
        onPress={handleShowMyHostEvent}
      >
        <Icon name="IconCongrates" size={30} fill="white" />
        <Text variant="bodySB" color="white">
          {MENT_USER.MAIN.HOST_EVENT}
        </Text>
      </Pressable>
      {/* <Pressable style={userMenuButtonGroupStyles.menuButton}>
        <Icon name="IconComment" size={30} fill="white" />
        <Text variant="bodySB" color="white">
          {MENT_USER.MAIN.MY_COMMENT}
        </Text>
      </Pressable> */}
    </View>
  );
};

export default UserMenuButtonGroup;
