import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import PhoneCertificationForm from 'components/authorize/forms/PhoneCertificationForm/PhoneCertificationForm';
import { UserInfoStatus } from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import { useCheckSms, useSendSms } from 'hooks/queries/user';
import { Dispatch, useContext, useState } from 'react';
import { AuthStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import DialogContext from 'utils/DialogContext';
import { validateAuthNumber, validatePhoneNumber } from 'utils/validate';

interface Props {
  dispatch: Dispatch<Action>;
}

const PhoneCertificationScreen = ({ dispatch }: Props) => {
  const { openDialog } = useContext(DialogContext);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [authnumber, setAuthnumber] = useState<string>('');
  const [retry, setRetry] = useState<boolean>(false);

  const handleSendSmsSuccess = () => {
    openDialog({
      type: 'success',
      text: '인증번호를 발송하였습니다.',
    });
  };

  const handleAuthorizeFlow = () => {
    dispatch({
      type: UserInfoStatus.SET_PHONE_NUMBER,
      phoneNumber: phonenumber,
    });
    navigation.navigate(AuthorizeMenu.Nickname);
  };

  const handleCheckSmsSuccess = () => {
    openDialog({
      type: 'success',
      text: '핸드폰 인증이 완료되었습니다.',
      callback: handleAuthorizeFlow,
    });
  };

  const { mutateAsync: sendSms } = useSendSms(handleSendSmsSuccess);
  const { mutateAsync: checkSms } = useCheckSms(handleCheckSmsSuccess);

  const handleCertification = () => {
    sendSms({
      content: '핸드폰 인증',
      to: phonenumber.replaceAll('-', ''),
    }).then(() => {
      setRetry(true);
    });
  };

  const isActive =
    !validatePhoneNumber(phonenumber) &&
    phonenumber.length > 1 &&
    !validateAuthNumber(authnumber) &&
    authnumber.length > 1 &&
    retry;

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
