import i18n from 'locales';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import FormPasswordInput from 'components/authorize/inputs/FormPasswordInput/FormPasswordInput';
import Text from 'components/common/Text/Text';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import useDialog from 'hooks/app/useDialog';
import { useResetPassword } from 'hooks/queries/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import { PasswordValue } from 'types/join';
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
  const [isAuthorize, setIsAuthorize] = useState<boolean>(false);
  const { openDialog } = useDialog();

  const handleSuccessCallback = () => {
    setIsAuthorize(true);
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

  return (
    <>
      {isLoading && (
        <CommonLoading isActive backgroundColor={colors.background} />
      )}
      <View style={passwordResetScreenStyles.container}>
        {!isAuthorize ? (
          <ScreenCover
            authorizeButton={{
              handlePress: handleSubmit((data) => {
                resetPassword({
                  email,
                  phoneNum,
                  newPassword: data.passwordCheck,
                });
              }),
              label: i18n.t('next'),
              isActive: true,
            }}
          >
            <View style={passwordResetScreenStyles.passwordResetTitle}>
              <Text variant="h3" color="white">
                {i18n.t('authorize.reset_password')}
              </Text>
            </View>
            <FormPasswordInput
              control={control}
              errors={errors}
              name="password"
              label={i18n.t('authorize.new_password')}
              validate={(value: string) => validatePassword(value)}
              requiredMessage={i18n.t('authorize.input_password')}
            />
            <FormPasswordInput
              control={control}
              errors={errors}
              name="passwordCheck"
              label={i18n.t('authorize.new_password')}
              validate={(check: string) => {
                const changedPassword = watch('password');
                return validatePasswordCheck(changedPassword, check);
              }}
              requiredMessage={i18n.t('authorize.input_password_check')}
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
