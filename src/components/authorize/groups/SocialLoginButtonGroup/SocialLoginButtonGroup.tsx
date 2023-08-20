import SocialLoginButton from 'components/authorize/buttons/SocialLoginButton/SocialLoginButton';
import { Image, Platform, View } from 'react-native';
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
      <SocialLoginButton color="#FDE500" handlePress={kakaoLogin}>
        <Image
          style={socialLoginButtonGroupStyles.socialLogo}
          source={require('../../../../assets/images/kakao.png')}
        />
      </SocialLoginButton>
      <SocialLoginButton color="#1EC800" handlePress={naverLogin}>
        <Image
          style={socialLoginButtonGroupStyles.socialLogo}
          source={require('../../../../assets/images/naver.png')}
        />
      </SocialLoginButton>
      {Platform.OS === 'ios' && (
        <SocialLoginButton color="#FFF" handlePress={appleLogin}>
          <Image
            style={socialLoginButtonGroupStyles.socialLogo}
            source={require('../../../../assets/images/apple.png')}
          />
        </SocialLoginButton>
      )}
      <SocialLoginButton color="#FFF" handlePress={googleLogin}>
        <Image
          style={socialLoginButtonGroupStyles.socialLogo}
          source={require('../../../../assets/images/google.png')}
        />
      </SocialLoginButton>
    </View>
  );
};

export default SocialLoginButtonGroup;
