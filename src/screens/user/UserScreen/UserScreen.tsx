import i18n from 'locales';
import Divider from 'components/common/Divider/Divider';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import UserSupportGroup from 'components/user/groups/UserSupportGroup/UserSupportGroup';
import { useLogout } from 'hooks/queries/user';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import UserInfoContainer from 'containers/user/UserInfoContainer/UserInfoContainer';
import { useAuthorizeStore } from 'stores/Authorize';
import UserNeedToLoginContainer from 'containers/user/UserNeedToLoginContainer/UserNeedToLoginContainer';
import userScreenStyles from './UserScreen.style';

const UserScreen = () => {
  const { isLoading: isLogoutLoading } = useLogout();

  const { isLogin } = useAuthorizeStore();

  return (
    <View style={userScreenStyles.container}>
      {isLogoutLoading && (
        <WithIconLoading
          isActive
          backgroundColor={colors.background}
          text={i18n.t('logout_ment')}
        />
      )}
      {isLogin ? <UserInfoContainer /> : <UserNeedToLoginContainer />}
      <Divider height={8} color="darkGrey" />

      <UserSupportGroup />
    </View>
  );
};

export default UserScreen;
