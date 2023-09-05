import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import PhoneCertificationForm from 'components/authorize/forms/PhoneCertificationForm/PhoneCertificationForm';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import MENT_AUTHORIZE from 'constants/authorize/authorizeMessage';
import useDialog from 'hooks/app/useDialog';
import usePhoneCertificate from 'hooks/authorize/usePhoneCertificate';
import { useCheckAuthSms, useSendAuthSms } from 'hooks/queries/auth';
import { useState } from 'react';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
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
  const { openDialog } = useDialog();
  const [retry, setRetry] = useState<boolean>(false);
  const [isAuthorize, setIsAuthorize] = useState<boolean>(false);

  const handleCheckSmsError = (error: ApiErrorResponse) => {
    if (error.response?.data.code === 800) {
      openDialog({
        type: 'validate',
        text: MENT_AUTHORIZE.FIND.CANNOT_FIND_ID,
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
      text: MENT_AUTHORIZE.PHONE_CERTIFICATION
        .SEND_CERTIFICATION_NUMBER_MESSAGE,
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
        text: MENT_AUTHORIZE.FIND.NOT_MATCHED_USER_INFO,
      });
    }
  };

  return (
    <>
      {(isSendAuthSms || isCheckAuthSms) && (
        <CommonLoading isActive backgroundColor={colors.background} />
      )}
      <View style={passwordFindScreenStyles.container}>
        {!isAuthorize ? (
          <ScreenCover
            authorizeButton={{
              handlePress: handleAuthorizeFlow,
              label: MENT_AUTHORIZE.MAIN.NEXT,
              isActive: isResetButtonActive,
            }}
          >
            <EssentialInput
              validation={validateEmail}
              label={MENT_AUTHORIZE.MAIN.EMAIL}
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
          <PasswordResetScreen
            email={emailAddress}
            phoneNum={phonenumber.replaceAll('-', '')}
          />
        )}
      </View>
    </>
  );
};

export default PasswordFindScreen;
