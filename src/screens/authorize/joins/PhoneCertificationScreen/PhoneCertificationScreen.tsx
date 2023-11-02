import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import PhoneCertificationForm from 'components/authorize/forms/PhoneCertificationForm/PhoneCertificationForm';
import { AuthorizeMenu } from 'constants/app/menu';
import { UserInfoStatus } from 'constants/authorize/join';
import useDialog from 'hooks/app/useDialog';
import usePhoneCertificate from 'hooks/authorize/usePhoneCertificate';
import { useCheckSms, useSendSms } from 'hooks/queries/user';
import i18n from 'locales';
import { Dispatch } from 'react';
import { ApiErrorResponse } from 'types/ApiResponse';
import { RootStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';

interface Props {
  dispatch: Dispatch<Action>;
}

const PhoneCertificationScreen = ({ dispatch }: Props) => {
  const { openDialog } = useDialog();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
        text: i18n.t('duplicated_user_info'),
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
      text: i18n.t('send_certification_number_message'),
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
        label: i18n.t('next'),
        isActive,
      }}
      titleElements={[i18n.t('phone_title')]}
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
