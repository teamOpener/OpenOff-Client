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
import useDialog from 'hooks/app/useDialog';
import { useNormalLogin, useSocialLogin } from 'hooks/queries/auth';
import UserTotalInfoResponseDto from 'models/user/response/UserTotalInfoResponseDto';
import { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { useAuthorizeStore } from 'stores/Authorize';
import { colors } from 'styles/theme';
import { ApiResponse } from 'types/ApiResponse';
import { AuthStackParamList } from 'types/apps/menu';
import { SocialType } from 'types/user';
import { validateEmail, validatePassword } from 'utils/validate';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncAuthorizeStorage from 'types/apps/asyncAuthorizeStorage';
import { permitAlert } from 'apis/user';
import DeviceInfo from 'react-native-device-info';
import loginScreenStyles from './LoginScreen.style';

const LoginScreen = () => {
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
      text: error.response?.data.message ?? '서버에 오류가 발생했습니다.',
    });
  };

  const handleSocialLoginError = (error: AxiosError<ApiResponse>) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? '서버에 오류가 발생했습니다.',
    });
  };

  const handleLoginSuccess = async () => {
    const deviceInfo = await DeviceInfo.getUniqueId();
    const value = await AsyncStorage.getItem('authorize');
    const authorizeStore: AsyncAuthorizeStorage = JSON.parse(value ?? '');
    if (authorizeStore.state.fcmToken) {
      if (Platform.OS === 'ios') messaging().registerDeviceForRemoteMessages();
      messaging().onTokenRefresh(async (token) => {
        await permitAlert({
          fcmToken: token,
          deviceId: deviceInfo,
        });
        setFcmToken(token);
      });
    }
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
      {(isSocialLoginLoading || isNormalLoginLoading) && (
        <WithIconLoading
          isActive
          backgroundColor={colors.background}
          text="로그인 중입니다."
        />
      )}
      <ScrollView contentContainerStyle={loginScreenStyles.contentContainer}>
        <Image
          style={loginScreenStyles.logo}
          source={require('../../../../assets/images/logo.png')}
        />

        <View style={loginScreenStyles.mainContainer}>
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
          <Text style={loginScreenStyles.middleText}>또는</Text>
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
