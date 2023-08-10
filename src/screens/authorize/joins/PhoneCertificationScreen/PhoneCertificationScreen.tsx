import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import PhoneCertificationForm from 'components/authorize/forms/PhoneCertificationForm/PhoneCertificationForm';
import { UserInfoStatus } from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import usePhoneCertificate from 'hooks/authorize/usePhoneCertificate';
import { useCheckSms, useSendSms } from 'hooks/queries/user';
import { Dispatch, useContext } from 'react';
import { ApiErrorResponse } from 'types/ApiResponse';
import { AuthStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import DialogContext from 'utils/DialogContext';

interface Props {
  dispatch: Dispatch<Action>;
}

const PhoneCertificationScreen = ({ dispatch }: Props) => {
  const { openDialog } = useContext(DialogContext);
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
    openDialog({
      type: 'validate',
      text: error.message,
    });
  };

  const handleSendSmsSuccess = () => {
    openDialog({
      type: 'success',
      text: '인증번호를 발송하였습니다.',
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
        label: '다음',
        isActive,
      }}
      titleElements={['휴대폰 인증을 해주세요.']}
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
