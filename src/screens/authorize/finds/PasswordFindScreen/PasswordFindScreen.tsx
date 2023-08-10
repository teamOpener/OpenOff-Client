import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import PhoneCertificationForm from 'components/authorize/forms/PhoneCertificationForm/PhoneCertificationForm';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import usePhoneCertificate from 'hooks/authorize/usePhoneCertificate';
import { useCheckAuthSms, useSendAuthSms } from 'hooks/queries/auth';
import { useContext, useState } from 'react';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import DialogContext from 'utils/DialogContext';
import {
  validateAuthNumber,
  validateEmail,
  validatePhoneNumber,
} from 'utils/validate';
import PasswordResetScreen from '../PasswordResetScreen/PasswordResetScreen';
import passwordFindScreenStyles from './PasswordFindScreen.style';

const PasswordFindScreen = () => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  const { phonenumber, setPhonenumber, authnumber, setAuthnumber } =
    usePhoneCertificate();
  const { openDialog } = useContext(DialogContext);
  const [retry, setRetry] = useState<boolean>(false);
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

  const isResetButtonActive: boolean =
    !validatePhoneNumber(phonenumber) &&
    phonenumber.length > 1 &&
    !validateAuthNumber(authnumber) &&
    authnumber.length > 1 &&
    !validateEmail(emailAddress) &&
    emailAddress.length > 1 &&
    retry;

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
    if (emailInfo.data?.id === emailAddress) {
      setIsAuthorize(true);
    } else {
      openDialog({
        type: 'validate',
        text: '회원정보가 일치하지 않습니다. 이메일과 핸드폰 번호를 확인해주세요.',
      });
    }
  };

  if (isCheckAuthSms || isSendAuthSms) {
    <CommonLoading isActive backgroundColor={colors.background} />;
  }

  return (
    <View style={passwordFindScreenStyles.container}>
      {!isAuthorize ? (
        <ScreenCover
          authorizeButton={{
            handlePress: handleAuthorizeFlow,
            label: '다음',
            isActive: isResetButtonActive,
          }}
        >
          <EssentialInput
            validation={validateEmail}
            label="이메일"
            keyboardType="default"
            value={emailAddress}
            setValue={setEmailAddress}
            type="emailAddress"
          />
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
        <PasswordResetScreen email={emailAddress} />
      )}
    </View>
  );
};

export default PasswordFindScreen;
