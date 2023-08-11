import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import Text from 'components/common/Text/Text';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import { useResetPassword } from 'hooks/queries/auth';
import { useContext, useState } from 'react';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import DialogContext from 'utils/DialogContext';
import { validatePassword, validatePasswordCheck } from 'utils/validate';
import PasswordResetCompleteScreen from '../PasswordResetCompleteScreen/PasswordResetCompleteScreen';
import passwordResetScreenStyles from './PasswordResetScreen.style';

interface Props {
  email?: string;
  phoneNum?: string;
}

const PasswordResetScreen = ({
  email = 'error',
  phoneNum = 'error',
}: Props) => {
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isAuthorize, setIsAuthorize] = useState<boolean>(false);
  const { openDialog } = useContext(DialogContext);

  const handleSuccessCallback = () => {
    setIsAuthorize(true);
  };
  const handleErrorCallback = (error: ApiErrorResponse) => {
    openDialog({
      text: error.message,
      type: 'validate',
    });
  };
  const { mutateAsync: resetPassword, isLoading } = useResetPassword(
    handleSuccessCallback,
    handleErrorCallback,
  );
  const handleChangePassword = () => {
    resetPassword({
      email,
      phoneNum,
      newPassword: passwordCheck,
    });
  };

  const isConfirmPassword =
    !validatePassword(password) &&
    password.length > 1 &&
    !validatePasswordCheck(password, passwordCheck) &&
    passwordCheck.length > 1;

  return (
    <>
      {isLoading && (
        <CommonLoading isActive backgroundColor={colors.background} />
      )}
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
    </>
  );
};

export default PasswordResetScreen;
