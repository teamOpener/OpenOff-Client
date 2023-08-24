import SocialLoginButton from 'components/authorize/buttons/SocialLoginButton/SocialLoginButton';
import Icon from 'components/common/Icon/Icon';
import { useEffect } from 'react';
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
  useEffect(() => {
    console.log(recentLogin);
  }, []);
  return (
    <View style={socialLoginButtonGroupStyles.container}>
      <View style={socialLoginButtonGroupStyles.absoluteContainer}>
        {recentLogin === 'KAKAO' && (
          <Image
            style={socialLoginButtonGroupStyles.recentLogin}
            source={require('../../../../assets/images/recentLogin.png')}
          />
        )}
        <SocialLoginButton color="#FDE500" handlePress={kakaoLogin}>
          <Image
            style={socialLoginButtonGroupStyles.socialLogo}
            source={require('../../../../assets/images/kakao.png')}
          />
        </SocialLoginButton>
      </View>
      {/* <SocialLoginButton color="#1EC800" handlePress={naverLogin}>
        <Image
          style={socialLoginButtonGroupStyles.socialLogo}
          source={require('../../../../assets/images/naver.png')}
        />
      </SocialLoginButton> */}
      {Platform.OS === 'ios' && (
        <View style={socialLoginButtonGroupStyles.absoluteContainer}>
          {recentLogin === 'APPLE' && (
            <Image
              style={socialLoginButtonGroupStyles.recentLogin}
              source={require('../../../../assets/images/recentLogin.png')}
            />
          )}
          <SocialLoginButton color="#FFF" handlePress={appleLogin}>
            <Icon name="IconApple" size={70} />
          </SocialLoginButton>
        </View>
      )}
      {/* <SocialLoginButton color="#FFF" handlePress={googleLogin}>
        <Image
          style={socialLoginButtonGroupStyles.socialLogo}
          source={require('../../../../assets/images/google.png')}
        />
      </SocialLoginButton> */}
    </View>
  );
};

export default SocialLoginButtonGroup;
