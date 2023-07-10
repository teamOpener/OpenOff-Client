import SocialLoginButton from 'components/authorize/buttons/SocialLoginButton/SocialLoginButton';
import { View } from 'react-native';
import socialLoginButtonGroupStyles from './SocialLoginButtonGroup.style';

interface Props {
  kakaoLogin: () => void;
  naverLogin: () => void;
  googleLogin: () => void;
  appleLogin: () => void;
}

const SocialLoginButtonGroup = ({
  kakaoLogin,
  naverLogin,
  googleLogin,
  appleLogin,
}: Props) => {
  return (
    <View style={socialLoginButtonGroupStyles.container}>
      <SocialLoginButton
        label="kakao"
        color="#FDE500"
        handlePress={kakaoLogin}
      />
      <SocialLoginButton
        label="naver"
        color="#1EC800"
        handlePress={naverLogin}
      />
      <SocialLoginButton label="apple" color="#FFF" handlePress={googleLogin} />
      <SocialLoginButton label="google" color="#FFF" handlePress={appleLogin} />
    </View>
  );
};

export default SocialLoginButtonGroup;
