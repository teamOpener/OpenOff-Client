import i18n from 'locales';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import Text from 'components/common/Text/Text';
import { AuthorizeMenu } from 'constants/app/menu';
import { Image, View } from 'react-native';
import { AuthStackParamList } from 'types/apps/menu';
import passwordResetCompleteScreenStyles from './PasswordResetCompleteScreen.style';

const PasswordResetCompleteScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <ScreenCover
      authorizeButton={{
        handlePress: () => navigation.navigate(AuthorizeMenu.Login),
        label: i18n.t('authorize.back_to_login'),
        isActive: true,
      }}
    >
      <View style={passwordResetCompleteScreenStyles.authorizeContainer}>
        <Image
          style={passwordResetCompleteScreenStyles.checkImage}
          source={require('../../../../assets/images/check.png')}
        />
        <Text variant="h4" color="main">
          {i18n.t('authorize.success_reset_password')}
        </Text>
        <Text variant="body2" color="white">
          {i18n.t('authorize.login_introductory_comment')}
        </Text>
      </View>
    </ScreenCover>
  );
};

export default PasswordResetCompleteScreen;
