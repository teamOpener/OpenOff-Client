import { NavigationProp, useNavigation } from '@react-navigation/native';
import AuthorizeFlowButton from 'components/authorize/buttons/AuthorizeFlowButton/AuthorizeFlowButton';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import UserInfoStatus from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import { Dispatch, useState } from 'react';
import { Text, View } from 'react-native';
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
      <Text style={emailPasswordScreenStyles.title}>
        이메일과 비밀번호를 입력해주세요.
      </Text>
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
      <AuthorizeFlowButton
        handlePress={() => {
          dispatch({ type: UserInfoStatus.SET_AGREE_TO_TERM, term: 'Y' });
          navigation.navigate(AuthorizeMenu.AgreeToTerm);
        }}
        label="확인"
        isActive={isActive}
      />
    </View>
  );
};

export default EmailPasswordScreen;
