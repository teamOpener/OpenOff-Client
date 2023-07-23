import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import Text from 'components/common/Text/Text';
import { UserInfoStatus } from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import { Dispatch, useState } from 'react';
import { View } from 'react-native';
import { AuthStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import { validateEmail, validatePassword } from 'utils/validate';
import emailPasswordScreenStyles from './EmailPasswordScreen.style';

interface Props {
  dispatch: Dispatch<Action>;
}

const EmailPasswordScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const isActive =
    !validateEmail(email) &&
    email.length > 1 &&
    !validatePassword(password) &&
    password.length > 1;
  return (
    <View style={emailPasswordScreenStyles.container}>
      <ScreenCover
        authorizeButton={{
          handlePress: () => {
            dispatch({
              type: UserInfoStatus.SET_EMAIL_ADDRESS_PASSWORD,
              emailPassword: { email, password },
            });
            navigation.navigate(AuthorizeMenu.AgreeToTerm);
          },
          label: '확인',
          isActive,
        }}
      >
        <View style={emailPasswordScreenStyles.titleContainer}>
          <Text color="white" variant="h1">
            이메일과 비밀번호를
          </Text>
          <Text color="white" variant="h1">
            입력해주세요.
          </Text>
        </View>
        <EssentialInput
          validation={validateEmail}
          label="이메일 주소"
          value={email}
          setValue={setEmail}
          type="email"
        />
        <EssentialInput
          validation={validatePassword}
          label="비밀번호"
          value={password}
          setValue={setPassword}
          type="password"
        />
      </ScreenCover>
    </View>
  );
};

export default EmailPasswordScreen;
