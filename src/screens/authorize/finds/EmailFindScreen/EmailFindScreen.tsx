import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import PhoneCertificationForm from 'components/authorize/forms/PhoneCertificationForm/PhoneCertificationForm';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import usePhoneCertificate from 'hooks/authorize/usePhoneCertificate';
import { useCheckAuthSms, useSendAuthSms } from 'hooks/queries/auth';
import { useContext, useState } from 'react';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import DialogContext from 'utils/DialogContext';
import EmailFindCompleteScreen from '../EmailFindCompleteScreen/EmailFindCompleteScreen';
import emailFindScreenStyles from './EmailFindScreen.style';

const EmailFindScreen = () => {
  const { openDialog } = useContext(DialogContext);
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
        text: '해당 핸드폰으로 등록된 아이디가 존재하지 않습니다!',
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
      text: '인증번호를 발송하였습니다.',
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

  if (isCheckAuthSms || isSendAuthSms) {
    <CommonLoading isActive backgroundColor={colors.background} />;
  }

  return (
    <View style={emailFindScreenStyles.container}>
      {!isAuthorize ? (
        <ScreenCover
          authorizeButton={{
            handlePress: handleAuthorizeFlow,
            label: '다음',
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
  );
};

export default EmailFindScreen;
