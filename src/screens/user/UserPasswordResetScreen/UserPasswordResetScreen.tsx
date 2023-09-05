import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import FormPasswordInput from 'components/authorize/inputs/FormPasswordInput/FormPasswordInput';
import Text from 'components/common/Text/Text';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import MENT_USER from 'constants/user/userMessage';
import useDialog from 'hooks/app/useDialog';
import useNavigator from 'hooks/navigator/useNavigator';
import { useResetPassword } from 'hooks/queries/auth';
import { useMyInfo } from 'hooks/queries/user';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import { PasswordValue } from 'types/join';
import { validatePassword, validatePasswordCheck } from 'utils/validate';
import userPasswordResetScreenStyles from './UserPasswordResetScreen.style';

const UserPasswordResetScreen = () => {
  const { stackNavigation } = useNavigator();
  const { openDialog } = useDialog();
  const { data: userInfo } = useMyInfo();

  const handleSuccessCallback = () => {
    openDialog({
      text: MENT_USER.SUCCESS.PASSWORD_RESET_SUCCESS,
      type: 'success',
      callback: () => stackNavigation.goBack(),
    });
  };

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PasswordValue>();

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

  if (isLoading)
    return <CommonLoading isActive backgroundColor={colors.background} />;

  return (
    <ScreenCover
      authorizeButton={{
        handlePress: handleSubmit((data) => {
          resetPassword({
            email:
              userInfo?.socialAccountInfoList.find(
                (socialAccount) => socialAccount.accountType === 'NORMAL',
              )?.email ?? '',
            phoneNum: userInfo?.userInfo.phoneNumber ?? '',
            newPassword: data.passwordCheck,
          });
        }),
        label: MENT_USER.AUTHORIZE_BUTTON_TEXT,
        isActive: true,
      }}
    >
      <View style={userPasswordResetScreenStyles.passwordResetTitle}>
        <Text variant="h3" color="white">
          {MENT_USER.PASSWORD_RESET.PASSWORD_RESET_MENT}
        </Text>
      </View>
      <FormPasswordInput
        control={control}
        errors={errors}
        name="password"
        label="새 비밀번호"
        validate={(value: string) => validatePassword(value)}
        requiredMessage="비밀번호를 입력해주세요"
      />
      <FormPasswordInput
        control={control}
        errors={errors}
        name="passwordCheck"
        label="새 비밀번호 확인"
        validate={(check: string) => {
          const changedPassword = watch('password');
          return validatePasswordCheck(changedPassword, check);
        }}
        requiredMessage="비밀번호 확인을 입력해주세요"
      />
    </ScreenCover>
  );
};

export default UserPasswordResetScreen;
