import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import Text from 'components/common/Text/Text';
import { AuthorizeMenu } from 'constants/app/menu';
import MENT_AUTHORIZE from 'constants/authorize/authorizeMessage';
import { Image, View } from 'react-native';
import { AuthStackParamList } from 'types/apps/menu';
import passwordResetCompleteScreenStyles from './PasswordResetCompleteScreen.style';

const PasswordResetCompleteScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <ScreenCover
      authorizeButton={{
        handlePress: () => navigation.navigate(AuthorizeMenu.Login),
        label: MENT_AUTHORIZE.FIND.BACK_TO_LOGIN,
        isActive: true,
      }}
    >
      <View style={passwordResetCompleteScreenStyles.authorizeContainer}>
        <Image
          style={passwordResetCompleteScreenStyles.checkImage}
          source={require('../../../../assets/images/check.png')}
        />
        <Text variant="h4" color="main">
          {MENT_AUTHORIZE.FIND.SUCCESS_RESET_PASSWORD}
        </Text>
        <Text variant="body2" color="white">
          {MENT_AUTHORIZE.FIND.LOGIN_INTRODUCTORY_COMMENT}
        </Text>
      </View>
    </ScreenCover>
  );
};

export default PasswordResetCompleteScreen;
