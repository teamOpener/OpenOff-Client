import { AxiosError } from 'axios';
import { loginWithKakaoAccount } from '@react-native-seoul/kakao-login';
import ApiResponse from 'types/ApiResponse';
import { useNormalLogin } from 'hooks/queries/auth';
import Text from 'components/common/Text/Text';
import JoinButton from 'components/authorize/buttons/JoinAndFindButton/JoinAndFindButton';
import LoginButton from 'components/authorize/buttons/LoginButton/LoginButton';
import SocialLoginButtonGroup from 'components/authorize/groups/SocialLoginButtonGroup/SocialLoginButtonGroup';
import LoginInput from 'components/authorize/inputs/LoginInput/LoginInput';
import { Dispatch, SetStateAction, useState } from 'react';
import { Image, View } from 'react-native';
import { validateEmail, validatePassword } from 'utils/validate';

import loginScreenStyles from './LoginScreen.style';

interface Props {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const LoginScreen = ({ setIsLogin }: Props) => {
  const [emailAddress, setEmailAddress] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  const handleLoginSuccess = () => {
    setIsLogin(true);
  };

  const handleLoginError = (error: AxiosError<ApiResponse>) => {
    console.log(error.response?.data);
  };

  const { mutateAsync: normalLogin } = useNormalLogin(
    handleLoginSuccess,
    handleLoginError,
  );

  const isActive =
    !validateEmail(emailAddress) &&
    !validatePassword(password) &&
    emailAddress.length >= 1 &&
    password.length >= 1;

  const kakaoLogin = () => {
    loginWithKakaoAccount()
      .then((result) => {
        console.log('Login Success', JSON.stringify(result));
        setIsLogin(true);
      })
      .catch(() => {
        return false;
      });
  };

  const handleCommonLogin = () => {
    if (!isActive) return;
    normalLogin({ email: emailAddress, password });
  };

  return (
    <View style={loginScreenStyles.container}>
      <Image
        style={loginScreenStyles.logo}
        source={require('../../../../assets/images/logo.png')}
      />
      <LoginInput
        label="이메일"
        value={emailAddress}
        type="emailAddress"
        validation={validateEmail}
        setValue={setEmailAddress}
      />
      <LoginInput
        label="비밀번호"
        value={password}
        type="password"
        setValue={setPassword}
        validation={validatePassword}
      />
      <LoginButton isActive={isActive} handlePress={handleCommonLogin} />
      <Text variant="caption" style={loginScreenStyles.middleText}>
        또는
      </Text>
      <SocialLoginButtonGroup
        kakaoLogin={kakaoLogin}
        naverLogin={() => {
          return false;
        }}
        googleLogin={() => {
          return false;
        }}
        appleLogin={() => {
          return false;
        }}
      />
      <View style={loginScreenStyles.joinAndFindContainer}>
        <JoinButton />
      </View>
    </View>
  );
};

export default LoginScreen;
