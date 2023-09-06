import Divider from 'components/common/Divider/Divider';
import Text from 'components/common/Text/Text';
import MENT_DIALOG from 'constants/common/dialogMessage';
import MENT_USER from 'constants/user/userMessage';
import useDialog from 'hooks/app/useDialog';
import { useLogout } from 'hooks/queries/user';
import {
  Linking,
  NativeModules,
  Platform,
  Pressable,
  ScrollView,
} from 'react-native';
import { openSettings } from 'react-native-permissions';
import userSupportGroupStyles from './UserSupportGroup.style';

const UserSupportGroup = () => {
  const { mutateAsync: logout } = useLogout();
  const { openDialog } = useDialog();

  const handleLogout = async () => {
    openDialog({
      type: 'warning',
      text: MENT_USER.SUPPORT.LOGOUT_CONFIRM,
      applyText: MENT_DIALOG.DIALOG.YES,
      closeText: MENT_DIALOG.DIALOG.NO,
      apply: async () => {
        await logout();
      },
    });
  };

  const handleShowFAQ = () => {
    Linking.openURL(
      'https://navy-web.notion.site/FAQ-0449b749375646c4b3a55fccc1e44ff7?pvs=4',
    );
  };

  const handleShowAnnoincement = () => {
    Linking.openURL(
      'https://navy-web.notion.site/9ff02822c01c4a5a905e197389d8b3e4?pvs=4',
    );
  };

  const handleShowInquiry = () => {
    Linking.openURL('http://pf.kakao.com/_QuKlG');
  };

  const handleShowTermToUse = () => {
    Linking.openURL(
      'https://navy-web.notion.site/fa8cb5d161d143409c331f4e3e7f30b1?pvs=4',
    );
  };

  const handleShowTermToPrivacy = () => {
    Linking.openURL(
      'https://navy-web.notion.site/efa559e8c07e40f484705b2fdca06524?pvs=4',
    );
  };

  const handleShowTermToMarketing = () => {
    Linking.openURL(
      'https://navy-web.notion.site/4da0a8c248094ce9ba3faf76d96466ab?pvs=4',
    );
  };

  const handleShowSettingScreen = () => {
    if (Platform.OS === 'ios') {
      openSettings();
    } else {
      NativeModules.ExternalURLModule.linkAndroidSettings();
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={userSupportGroupStyles.userControllerContainer}
    >
      <Text variant="bodySB" color="darkGrey">
        {MENT_USER.MAIN.CUSTOMER_SERVICE_CENTER}
      </Text>
      <Pressable onPress={handleShowFAQ}>
        <Text variant="body2">{MENT_USER.MAIN.FAQ}</Text>
      </Pressable>
      <Pressable onPress={handleShowAnnoincement}>
        <Text variant="body2">{MENT_USER.MAIN.ANNOUNCEMENT}</Text>
      </Pressable>
      <Pressable onPress={handleShowInquiry}>
        <Text variant="body2">{MENT_USER.MAIN.INQUIRY}</Text>
      </Pressable>
      <Divider height={1} color="darkGrey" />
      <Text variant="bodySB" color="darkGrey">
        {MENT_USER.MAIN.TERM}
      </Text>
      <Pressable onPress={handleShowTermToUse}>
        <Text variant="body2">{MENT_USER.MAIN.TERM_TO_USE}</Text>
      </Pressable>
      <Pressable onPress={handleShowTermToPrivacy}>
        <Text variant="body2">{MENT_USER.MAIN.TERM_TO_PRIVACY}</Text>
      </Pressable>
      <Pressable onPress={handleShowTermToMarketing}>
        <Text variant="body2">{MENT_USER.MAIN.TERM_TO_MARKETING}</Text>
      </Pressable>
      <Divider height={1} color="darkGrey" />
      <Text variant="bodySB" color="darkGrey">
        {MENT_USER.MAIN.SETTING}
      </Text>
      <Pressable onPress={handleShowSettingScreen}>
        <Text variant="body2">{MENT_USER.MAIN.SERVICE_SETTING}</Text>
      </Pressable>
      <Pressable onPress={handleLogout}>
        <Text variant="body2">{MENT_USER.MAIN.LOGOUT}</Text>
      </Pressable>
    </ScrollView>
  );
};

export default UserSupportGroup;
