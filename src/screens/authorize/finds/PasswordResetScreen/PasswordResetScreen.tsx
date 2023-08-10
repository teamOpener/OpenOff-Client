import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import Text from 'components/common/Text/Text';
import { useState } from 'react';
import { View } from 'react-native';
import { validatePassword, validatePasswordCheck } from 'utils/validate';
import PasswordResetCompleteScreen from '../PasswordResetCompleteScreen/PasswordResetCompleteScreen';
import passwordResetScreenStyles from './PasswordResetScreen.style';

interface Props {
  email?: string;
}

const PasswordResetScreen = ({ email }: Props) => {
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isAuthorize, setIsAuthorize] = useState<boolean>(false);
  const handleChangePassword = () => {
    setIsAuthorize(true);
  };

  const isConfirmPassword =
    !validatePassword(password) &&
    password.length > 1 &&
    !validatePasswordCheck(password, passwordCheck) &&
    passwordCheck.length > 1;

  return (
    <View style={passwordResetScreenStyles.container}>
      {!isAuthorize ? (
        <ScreenCover
          authorizeButton={{
            handlePress: handleChangePassword,
            label: '다음',
            isActive: isConfirmPassword,
          }}
        >
          <View style={passwordResetScreenStyles.passwordResetTitle}>
            <Text variant="h3" color="white">
              비밀번호를 재설정해주세요.
            </Text>
          </View>
          <EssentialInput
            validation={validatePassword}
            label="새 비밀번호"
            value={password}
            setValue={setPassword}
            type="password"
          />
          <EssentialInput
            validation={(check: string) =>
              validatePasswordCheck(password, check)
            }
            label="새 비밀번호 확인"
            value={passwordCheck}
            setValue={setPasswordCheck}
            type="password"
          />
        </ScreenCover>
      ) : (
        <PasswordResetCompleteScreen />
      )}
    </View>
  );
};

export default PasswordResetScreen;
