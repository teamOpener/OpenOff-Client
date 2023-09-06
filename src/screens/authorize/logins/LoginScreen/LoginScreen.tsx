import { appleAuth } from '@invertase/react-native-apple-authentication';
import { loginWithKakaoAccount } from '@react-native-seoul/kakao-login';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { clearToken } from 'apis';
import { AxiosError } from 'axios';
import JoinButton from 'components/authorize/buttons/JoinAndFindButton/JoinAndFindButton';
import LoginButton from 'components/authorize/buttons/LoginButton/LoginButton';
import SocialLoginButtonGroup from 'components/authorize/groups/SocialLoginButtonGroup/SocialLoginButtonGroup';
import LoginInput from 'components/authorize/inputs/LoginInput/LoginInput';
import Text from 'components/common/Text/Text';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import MENT_AUTHORIZE from 'constants/authorize/authorizeMessage';
import { UserInfoStatus } from 'constants/authorize/join';
import useDialog from 'hooks/app/useDialog';
import { useNormalLogin, useSocialLogin } from 'hooks/queries/auth';
import UserTotalInfoResponseDto from 'models/user/response/UserTotalInfoResponseDto';
import { Dispatch, useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useAuthorizeStore } from 'stores/Authorize';
import { colors } from 'styles/theme';
import { ApiResponse } from 'types/ApiResponse';
import { AuthStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import { SocialType } from 'types/user';
import { validateEmail, validatePassword } from 'utils/validate';
import loginScreenStyles from './LoginScreen.style';

interface Props {
  dispatch: Dispatch<Action>;
}

const LoginScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [firstLoginShow, setFirstLoginShow] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');

  const { setIsLogin, resetToken, setFcmToken, setRecentLogin, recentLogin } =
    useAuthorizeStore();

  const { openDialog } = useDialog();

  const handleLoginError = (error: AxiosError<ApiResponse>) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? MENT_AUTHORIZE.ERROR.SERVER_ERROR,
    });
  };

  const handleSocialLoginError = (error: AxiosError<ApiResponse>) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? MENT_AUTHORIZE.ERROR.SERVER_ERROR,
    });
  };

  const handleLoginSuccess = () => {
    //
  };

  const { mutateAsync: normalLogin, isLoading: isNormalLoginLoading } =
    useNormalLogin(handleLoginSuccess, handleLoginError);

  const { mutateAsync: socialLogin, isLoading: isSocialLoginLoading } =
    useSocialLogin(handleLoginSuccess, handleSocialLoginError);

  const isActive =
    !validateEmail(emailAddress) &&
    !validatePassword(password) &&
    emailAddress.length >= 1 &&
    password.length >= 1;

  const divergeAuthorizeFlow = (
    userInfo?: UserTotalInfoResponseDto['userInfo'],
    socialInfo?: SocialType,
  ) => {
    if (userInfo?.userName) {
      setRecentLogin(!socialInfo ? recentLogin : socialInfo);
      setIsLogin(true);
      return;
    }
    if (userInfo?.phoneNumber) {
      navigation.navigate('Nickname');
      return;
    }
    navigation.navigate('AgreeToTerm');
  };

  const handleKakaoLogin = async () => {
    const kakaoResult = await loginWithKakaoAccount();
    const socialLoginResult = await socialLogin({
      socialType: 'kakao',
      token: kakaoResult.idToken,
    });
    divergeAuthorizeFlow(socialLoginResult.data?.userInfo, 'KAKAO');
  };

  const handleAppleLogin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        dispatch({
          type: UserInfoStatus.SET_NAME,
          username: `${appleAuthRequestResponse.fullName?.familyName}${appleAuthRequestResponse.fullName?.givenName}`,
        });
        const socialLoginResult = await socialLogin({
          socialType: 'apple',
          token: appleAuthRequestResponse.identityToken ?? '',
        });
        divergeAuthorizeFlow(socialLoginResult.data?.userInfo, 'APPLE');
      }
    } catch (error) {
      if ((error as AxiosError).code === appleAuth.Error.CANCELED) {
        console.log('canceled');
      } else {
        console.log('error');
      }
    }
  };

  const handleCommonLogin = async () => {
    if (!isActive) return;
    const normalLoginResult = await normalLogin({
      email: emailAddress,
      password,
    });
    divergeAuthorizeFlow(normalLoginResult.data?.userInfo);
  };

  useEffect(() => {
    resetToken();
    clearToken();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setFirstLoginShow(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isSocialLoginLoading || isNormalLoginLoading) {
    return (
      <WithIconLoading
        isActive
        backgroundColor={colors.background}
        text="로그인 중입니다."
      />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={loginScreenStyles.container}
    >
      {firstLoginShow && (
        <View
          style={[StyleSheet.absoluteFill, loginScreenStyles.loadingContainer]}
        />
      )}
      <ScrollView contentContainerStyle={loginScreenStyles.contentContainer}>
        <Image
          style={loginScreenStyles.logo}
          source={require('../../../../assets/images/logo.png')}
        />

        <View style={loginScreenStyles.mainContainer}>
          <LoginInput
            label={MENT_AUTHORIZE.MAIN.EMAIL}
            value={emailAddress}
            type="emailAddress"
            validation={validateEmail}
            setValue={setEmailAddress}
          />
          <LoginInput
            label={MENT_AUTHORIZE.MAIN.PASSWORD}
            value={password}
            type="password"
            setValue={setPassword}
            validation={validatePassword}
          />
          <LoginButton isActive={isActive} handlePress={handleCommonLogin} />
          <Text style={loginScreenStyles.middleText}>
            {MENT_AUTHORIZE.LOGIN.OR}
          </Text>
          <SocialLoginButtonGroup
            kakaoLogin={handleKakaoLogin}
            naverLogin={() => {
              return false;
            }}
            googleLogin={() => {
              return false;
            }}
            appleLogin={handleAppleLogin}
          />

          <JoinButton />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
