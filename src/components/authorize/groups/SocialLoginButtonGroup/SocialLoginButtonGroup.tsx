import SocialLoginButton from 'components/authorize/buttons/SocialLoginButton/SocialLoginButton';
import { View } from 'react-native';
import socialLoginButtonGroupStyles from './SocialLoginButtonGroup.style';

const SocialLoginButtonGroup = () => {
  return (
    <View style={socialLoginButtonGroupStyles.container}>
      <SocialLoginButton
        label="kakao"
        color="#FDE500"
        handlePress={() => {
          return false;
        }}
      />
      <SocialLoginButton
        label="naver"
        color="#1EC800"
        handlePress={() => {
          return false;
        }}
      />
      <SocialLoginButton
        label="apple"
        color="#FFF"
        handlePress={() => {
          return false;
        }}
      />
      <SocialLoginButton
        label="google"
        color="#FFF"
        handlePress={() => {
          return false;
        }}
      />
    </View>
  );
};

export default SocialLoginButtonGroup;
