import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import Text from 'components/common/Text/Text';
import { AuthorizeMenu } from 'constants/menu';
import { Image, View } from 'react-native';
import { AuthStackParamList } from 'types/apps/menu';
import passwordResetCompleteScreenStyles from './PasswordResetCompleteScreen.style';

const PasswordResetCompleteScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <ScreenCover
      authorizeButton={{
        handlePress: () => navigation.navigate(AuthorizeMenu.Login),
        label: '로그인 화면으로',
        isActive: true,
      }}
    >
      <View style={passwordResetCompleteScreenStyles.authorizeContainer}>
        <Image
          style={passwordResetCompleteScreenStyles.checkImage}
          source={require('../../../../assets/images/check.png')}
        />
        <Text variant="h4" color="main">
          비밀번호 변경이 완료되었습니다.
        </Text>
        <Text variant="body2" color="white">
          다시 로그인을 해주세요.
        </Text>
      </View>
    </ScreenCover>
  );
};

export default PasswordResetCompleteScreen;
