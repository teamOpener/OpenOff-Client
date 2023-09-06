import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import PhoneCertificationForm from 'components/authorize/forms/PhoneCertificationForm/PhoneCertificationForm';
import { AuthorizeMenu } from 'constants/app/menu';
import MENT_AUTHORIZE from 'constants/authorize/authorizeMessage';
import { UserInfoStatus } from 'constants/authorize/join';
import useDialog from 'hooks/app/useDialog';
import usePhoneCertificate from 'hooks/authorize/usePhoneCertificate';
import { useCheckSms, useSendSms } from 'hooks/queries/user';
import { Dispatch } from 'react';
import { ApiErrorResponse } from 'types/ApiResponse';
import { AuthStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';

interface Props {
  dispatch: Dispatch<Action>;
}

const PhoneCertificationScreen = ({ dispatch }: Props) => {
  const { openDialog } = useDialog();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const {
    phonenumber,
    setPhonenumber,
    authnumber,
    setAuthnumber,
    retry,
    setRetry,
    isActive,
  } = usePhoneCertificate();

  const handleAuthorizeFlow = () => {
    dispatch({
      type: UserInfoStatus.SET_PHONE_NUMBER,
      phoneNumber: phonenumber,
    });
    navigation.navigate(AuthorizeMenu.Nickname);
  };

  const handleCheckSmsError = (error: ApiErrorResponse) => {
    if (error.response?.data.code === 1003) {
      openDialog({
        type: 'validate',
        text: MENT_AUTHORIZE.PHONE_CERTIFICATION.DUPLICATED_USER_INFO,
      });
      return;
    }
    openDialog({
      type: 'validate',
      text: error.message,
    });
  };

  const handleSendSmsSuccess = () => {
    openDialog({
      type: 'success',
      text: MENT_AUTHORIZE.PHONE_CERTIFICATION
        .SEND_CERTIFICATION_NUMBER_MESSAGE,
    });
  };

  const { mutateAsync: sendSms } = useSendSms(handleSendSmsSuccess);
  const { mutateAsync: checkSms } = useCheckSms(
    handleAuthorizeFlow,
    handleCheckSmsError,
  );

  const handleCertification = async () => {
    await sendSms({
      content: '핸드폰 인증',
      to: phonenumber.replaceAll('-', ''),
    });
    setRetry(true);
  };

  return (
    <ScreenCover
      authorizeButton={{
        handlePress: () =>
          checkSms({
            phoneNum: phonenumber.replaceAll('-', ''),
            checkNum: authnumber,
          }),
        label: MENT_AUTHORIZE.MAIN.NEXT,
        isActive,
      }}
      titleElements={MENT_AUTHORIZE.PHONE_CERTIFICATION.TITLE}
    >
      <PhoneCertificationForm
        retry={retry}
        setRetry={setRetry}
        handleCertification={handleCertification}
        phonenumber={phonenumber}
        setPhonenumber={setPhonenumber}
        authnumber={authnumber}
        setAuthnumber={setAuthnumber}
      />
    </ScreenCover>
  );
};

export default PhoneCertificationScreen;
