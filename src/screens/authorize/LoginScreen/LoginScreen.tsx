import JoinButton from 'components/authorize/buttons/JoinButton/JoinButton';
import LoginButton from 'components/authorize/buttons/LoginButton/LoginButton';
import SocialLoginButtonGroup from 'components/authorize/groups/SocialLoginButtonGroup/SocialLoginButtonGroup';
import LoginInput from 'components/authorize/inputs/LoginInput/LoginInput';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { Image, View } from 'react-native';
import { validateEmail, validatePassword } from 'utils/validate';
import Text from '../../../components/common/Text/Text';
import loginScreenStyles from './LoginScreen.style';

interface Props {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const LoginScreen = ({ setIsLogin }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  return (
    <View style={loginScreenStyles.container}>
      <Image
        style={loginScreenStyles.logo}
        // eslint-disable-next-line global-require
        source={require('../../../assets/images/logo.png')}
      />
      <LoginInput
        label="이메일"
        name="emailAddress"
        type="emailAddress"
        validation={validateEmail}
        errors={errors}
        control={control}
      />
      <LoginInput
        label="비밀번호"
        name="password"
        type="password"
        validation={validatePassword}
        errors={errors}
        control={control}
      />
      <LoginButton
        handlePress={handleSubmit(() => {
          setIsLogin(true);
        })}
      />
      <Text variant="caption" style={loginScreenStyles.middleText}>
        또는
      </Text>
      <SocialLoginButtonGroup />
      <JoinButton />
    </View>
  );
};

export default LoginScreen;
