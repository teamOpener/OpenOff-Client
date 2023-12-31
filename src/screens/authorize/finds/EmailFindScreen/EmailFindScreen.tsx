import i18n from 'locales';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import PhoneCertificationForm from 'components/authorize/forms/PhoneCertificationForm/PhoneCertificationForm';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import useDialog from 'hooks/app/useDialog';
import usePhoneCertificate from 'hooks/authorize/usePhoneCertificate';
import { useCheckAuthSms, useSendAuthSms } from 'hooks/queries/auth';
import { useState } from 'react';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import EmailFindCompleteScreen from '../EmailFindCompleteScreen/EmailFindCompleteScreen';
import emailFindScreenStyles from './EmailFindScreen.style';

const EmailFindScreen = () => {
  const { openDialog } = useDialog();
  const {
    phonenumber,
    setPhonenumber,
    authnumber,
    setAuthnumber,
    retry,
    setRetry,
    isActive,
  } = usePhoneCertificate();
  const [email, setEmail] = useState<string | undefined>('');
  const [isAuthorize, setIsAuthorize] = useState<boolean>(false);

  const handleCheckSmsError = (error: ApiErrorResponse) => {
    if (error.response?.data.code === 800) {
      openDialog({
        type: 'validate',
        text: i18n.t('cannot_find_id'),
      });
      return;
    }
    openDialog({
      type: 'validate',
      text: error.message,
    });
  };

  const handleCheckSmsSuccess = () => {
    setIsAuthorize(true);
  };

  const handleSendSmsSuccess = () => {
    openDialog({
      type: 'success',
      text: i18n.t('send_certification_number_message'),
    });
  };

  const { mutateAsync: sendAuthSms, isLoading: isSendAuthSms } =
    useSendAuthSms(handleSendSmsSuccess);
  const { mutateAsync: checkAuthSms, isLoading: isCheckAuthSms } =
    useCheckAuthSms(handleCheckSmsSuccess, handleCheckSmsError);

  const handleCertification = async () => {
    await sendAuthSms({
      content: '일반 핸드폰 인증',
      to: phonenumber.replaceAll('-', ''),
    });
    setRetry(true);
  };

  const handleAuthorizeFlow = async () => {
    const emailInfo = await checkAuthSms({
      phoneNum: phonenumber.replaceAll('-', ''),
      checkNum: authnumber,
    });
    setEmail(emailInfo.data?.id);
  };

  return (
    <>
      {(isCheckAuthSms || isSendAuthSms) && (
        <CommonLoading isActive backgroundColor={colors.background} />
      )}
      <View style={emailFindScreenStyles.container}>
        {!isAuthorize ? (
          <ScreenCover
            authorizeButton={{
              handlePress: handleAuthorizeFlow,
              label: i18n.t('next'),
              isActive,
            }}
          >
            <PhoneCertificationForm
              retry={retry}
              phonenumber={phonenumber}
              setPhonenumber={setPhonenumber}
              authnumber={authnumber}
              setAuthnumber={setAuthnumber}
              handleCertification={handleCertification}
              setRetry={setRetry}
            />
          </ScreenCover>
        ) : (
          <EmailFindCompleteScreen email={email} />
        )}
      </View>
    </>
  );
};

export default EmailFindScreen;
