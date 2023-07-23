import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import PhoneCertificationForm from 'components/authorize/forms/PhoneCertificationForm/PhoneCertificationForm';
import Text from 'components/common/Text/Text';
import { UserInfoStatus } from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import { Dispatch, useState } from 'react';
import { AuthStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import { validateAuthNumber, validatePhoneNumber } from 'utils/validate';
import phoneCertificationScreenStyles from './PhoneCertificationScreen.style';

interface Props {
  dispatch: Dispatch<Action>;
}

const PhoneCertificationScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [authnumber, setAuthnumber] = useState<string>('');
  const handleCertification = () => {
    console.log(phonenumber);
  };
  const handleAuthorizeFlow = () => {
    dispatch({
      type: UserInfoStatus.SET_PHONE_NUMBER,
      phoneNumber: phonenumber,
    });
    navigation.navigate(AuthorizeMenu.Nickname);
  };
  const isActive =
    !validatePhoneNumber(phonenumber) &&
    phonenumber.length > 1 &&
    !validateAuthNumber(authnumber) &&
    authnumber.length > 1;
  return (
    <ScreenCover
      authorizeButton={{
        handlePress: handleAuthorizeFlow,
        label: '다음',
        isActive,
      }}
    >
      <Text
        variant="h1"
        color="white"
        style={phoneCertificationScreenStyles.title}
      >
        휴대폰 인증을 해주세요.
      </Text>
      <PhoneCertificationForm
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
