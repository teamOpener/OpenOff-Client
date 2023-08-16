import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import Text from 'components/common/Text/Text';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import MENT_USER from 'constants/user/userConstants';
import useDialog from 'hooks/app/useDialog';
import useNavigator from 'hooks/navigator/useNavigator';
import { useResetPassword } from 'hooks/queries/auth';
import { useMyInfo } from 'hooks/queries/user';
import { useState } from 'react';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import { validatePassword, validatePasswordCheck } from 'utils/validate';
import userPasswordResetScreenStyles from './UserPasswordResetScreen.style';

const UserPasswordResetScreen = () => {
  const { stackNavigation } = useNavigator();
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const { openDialog } = useDialog();
  const { data: userInfo } = useMyInfo();

  const handleSuccessCallback = () => {
    openDialog({
      text: MENT_USER.SUCCESS.PASSWORD_RESET_SUCCESS,
      type: 'success',
      callback: () => stackNavigation.goBack(),
    });
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
      email: userInfo?.socialAccountInfoList[0].email ?? '',
      phoneNum: userInfo?.userInfo.phoneNumber ?? '',
      newPassword: passwordCheck,
    });
  };

  const isConfirmPassword =
    !validatePassword(password) &&
    password.length > 1 &&
    !validatePasswordCheck(password, passwordCheck) &&
    passwordCheck.length > 1;

  if (isLoading)
    return <CommonLoading isActive backgroundColor={colors.background} />;

  return (
    <ScreenCover
      authorizeButton={{
        handlePress: handleChangePassword,
        label: MENT_USER.AUTHORIZE_BUTTON_TEXT,
        isActive: isConfirmPassword,
      }}
    >
      <View style={userPasswordResetScreenStyles.passwordResetTitle}>
        <Text variant="h3" color="white">
          {MENT_USER.PASSWORD_RESET.PASSWORD_RESET_MENT}
        </Text>
      </View>
      <EssentialInput
        validation={validatePassword}
        label={MENT_USER.PASSWORD_RESET.NEW_PASSWORD}
        value={password}
        setValue={setPassword}
        type="password"
      />
      <EssentialInput
        validation={(check: string) => validatePasswordCheck(password, check)}
        label={MENT_USER.PASSWORD_RESET.NEW_PASSWORD_CONFIRM}
        value={passwordCheck}
        setValue={setPasswordCheck}
        type="password"
      />
    </ScreenCover>
  );
};

export default UserPasswordResetScreen;
