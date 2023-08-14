import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import Text from 'components/common/Text/Text';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import DialogContext from 'utils/DialogContext';
import { ApiErrorResponse } from 'types/ApiResponse';
import { useResetPassword } from 'hooks/queries/auth';
import { validatePassword, validatePasswordCheck } from 'utils/validate';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import { colors } from 'styles/theme';
import useNavigator from 'hooks/navigator/useNavigator';
import { useMyInfo } from 'hooks/queries/user';
import userPasswordResetScreenStyles from './UserPasswordResetScreen.style';

const UserPasswordResetScreen = () => {
  const { stackNavigation } = useNavigator();
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const { openDialog } = useContext(DialogContext);
  const { data: userInfo } = useMyInfo();

  const handleSuccessCallback = () => {
    openDialog({
      text: '비밀번호를 성공적으로 재설정했습니다!',
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
        label: '확인',
        isActive: isConfirmPassword,
      }}
    >
      <View style={userPasswordResetScreenStyles.passwordResetTitle}>
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
        validation={(check: string) => validatePasswordCheck(password, check)}
        label="새 비밀번호 확인"
        value={passwordCheck}
        setValue={setPasswordCheck}
        type="password"
      />
    </ScreenCover>
  );
};

export default UserPasswordResetScreen;
