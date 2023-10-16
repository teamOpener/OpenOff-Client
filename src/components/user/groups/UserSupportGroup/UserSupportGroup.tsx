import i18n from 'locales';
import Divider from 'components/common/Divider/Divider';
import Text from 'components/common/Text/Text';
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
      text: i18n.t('logout_confirm'),
      applyText: i18n.t('yes'),
      closeText: i18n.t('no'),
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
        {i18n.t('customer_service_center')}
      </Text>
      <Pressable onPress={handleShowFAQ}>
        <Text variant="body2">{i18n.t('faq')}</Text>
      </Pressable>
      <Pressable onPress={handleShowAnnoincement}>
        <Text variant="body2">{i18n.t('announcement')}</Text>
      </Pressable>
      <Pressable onPress={handleShowInquiry}>
        <Text variant="body2">{i18n.t('inquiry')}</Text>
      </Pressable>
      <Divider height={1} color="darkGrey" />
      <Text variant="bodySB" color="darkGrey">
        {i18n.t('term')}
      </Text>
      <Pressable onPress={handleShowTermToUse}>
        <Text variant="body2">{i18n.t('term_to_use')}</Text>
      </Pressable>
      <Pressable onPress={handleShowTermToPrivacy}>
        <Text variant="body2">{i18n.t('term_to_privacy')}</Text>
      </Pressable>
      <Pressable onPress={handleShowTermToMarketing}>
        <Text variant="body2">{i18n.t('term_to_marketing')}</Text>
      </Pressable>
      <Divider height={1} color="darkGrey" />
      <Text variant="bodySB" color="darkGrey">
        {i18n.t('setting')}
      </Text>
      <Pressable onPress={handleShowSettingScreen}>
        <Text variant="body2">{i18n.t('service_setting')}</Text>
      </Pressable>
      <Pressable onPress={handleLogout}>
        <Text variant="body2">{i18n.t('logout')}</Text>
      </Pressable>
    </ScrollView>
  );
};

export default UserSupportGroup;
