import Icon from 'components/common/Icon/Icon';
import { StackMenu } from 'constants/app/menu';
import useNavigator from 'hooks/navigator/useNavigator';
import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useAuthorizeStore } from 'stores/Authorize';
import useDialog from 'hooks/app/useDialog';
import i18n from 'locales';
import floatingButtonStyles from './FloatingButton.style';

const FloatingButton = () => {
  const { stackNavigation } = useNavigator();
  const { isLogin } = useAuthorizeStore();
  const { openDialog } = useDialog();

  const handlePress = useCallback(() => {
    if (!isLogin) {
      openDialog({
        type: 'warning',
        text: i18n.t('need_to_login'),
        apply: () => {
          stackNavigation.navigate('Login');
        },
        applyText: i18n.t('yes'),
        closeText: i18n.t('no'),
      });
      return;
    }
    stackNavigation.navigate(StackMenu.OpenEvent);
  }, [stackNavigation]);

  return (
    <TouchableOpacity
      style={floatingButtonStyles.container}
      activeOpacity={0.5}
      onPress={handlePress}
    >
      <Icon name="IconPlusCircle" size={53} fill="white" />
    </TouchableOpacity>
  );
};

export default FloatingButton;
