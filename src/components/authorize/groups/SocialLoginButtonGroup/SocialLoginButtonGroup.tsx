import SocialLoginButton from 'components/authorize/buttons/SocialLoginButton/SocialLoginButton';
import { Image, Platform, View } from 'react-native';
import { useAuthorizeStore } from 'stores/Authorize';
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
  const { recentLogin } = useAuthorizeStore();
  return (
    <View style={socialLoginButtonGroupStyles.container}>
      <SocialLoginButton color="#FDE500" handlePress={kakaoLogin}>
        {recentLogin === 'KAKAO' && (
          <Image
            style={socialLoginButtonGroupStyles.recentLogin}
            source={require('../../../../assets/images/recentLogin.png')}
          />
        )}
        <Image
          style={socialLoginButtonGroupStyles.socialLogo}
          source={require('../../../../assets/images/kakao.png')}
        />
      </SocialLoginButton>
      <SocialLoginButton color="#1EC800" handlePress={naverLogin}>
        {recentLogin === 'NAVER' && (
          <Image
            style={socialLoginButtonGroupStyles.recentLogin}
            source={require('../../../../assets/images/recentLogin.png')}
          />
        )}
        <Image
          style={socialLoginButtonGroupStyles.socialLogo}
          source={require('../../../../assets/images/naver.png')}
        />
      </SocialLoginButton>
      {Platform.OS === 'ios' && (
        <SocialLoginButton color="#FFF" handlePress={appleLogin}>
          {recentLogin === 'APPLE' && (
            <Image
              style={socialLoginButtonGroupStyles.recentLogin}
              source={require('../../../../assets/images/recentLogin.png')}
            />
          )}
          <Image
            style={socialLoginButtonGroupStyles.socialLogo}
            source={require('../../../../assets/images/apple.png')}
          />
        </SocialLoginButton>
      )}
      <SocialLoginButton color="#FFF" handlePress={googleLogin}>
        {recentLogin === 'GOOGLE' && (
          <Image
            style={socialLoginButtonGroupStyles.recentLogin}
            source={require('../../../../assets/images/recentLogin.png')}
          />
        )}
        <Image
          style={socialLoginButtonGroupStyles.socialLogo}
          source={require('../../../../assets/images/google.png')}
        />
      </SocialLoginButton>
    </View>
  );
};

export default SocialLoginButtonGroup;
