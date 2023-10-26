import i18n from 'locales';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import FormPasswordInput from 'components/authorize/inputs/FormPasswordInput/FormPasswordInput';
import Text from 'components/common/Text/Text';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
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
  const { data: userInfo } = useMyInfo({ isLogin: true });

  const handleSuccessCallback = () => {
    openDialog({
      text: i18n.t('password_reset_success'),
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
        label: i18n.t('confirm'),
        isActive: true,
      }}
    >
      <View style={userPasswordResetScreenStyles.passwordResetTitle}>
        <Text variant="h3" color="white">
          {i18n.t('authorize.reset_password')}
        </Text>
      </View>
      <FormPasswordInput
        control={control}
        errors={errors}
        name="password"
        label={i18n.t('new_password')}
        validate={(value: string) => validatePassword(value)}
        requiredMessage={i18n.t('input_password')}
      />
      <FormPasswordInput
        control={control}
        errors={errors}
        name="passwordCheck"
        label={i18n.t('new_password_check')}
        validate={(check: string) => {
          const changedPassword = watch('password');
          return validatePasswordCheck(changedPassword, check);
        }}
        requiredMessage={i18n.t('input_password_check')}
      />
    </ScreenCover>
  );
};

export default UserPasswordResetScreen;
