import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import PhoneCertificationForm from 'components/authorize/forms/PhoneCertificationForm/PhoneCertificationForm';
import Text from 'components/common/Text/Text';
import { useState } from 'react';
import { Image, View } from 'react-native';
import { validateAuthNumber, validatePhoneNumber } from 'utils/validate';
import emailFindScreenStyles from './EmailFindScreen.style';

const EmailFindScreen = () => {
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [authnumber, setAuthnumber] = useState<string>('');
  const [isAuthorize, setIsAuthorize] = useState<boolean>(false);
  const [retry, setRetry] = useState<boolean>(false);
  const handleCertification = () => {
    setRetry(true);
  };
  const handleAuthorizeFlow = () => {
    setIsAuthorize(true);
  };
  const isActive =
    !validatePhoneNumber(phonenumber) &&
    phonenumber.length > 1 &&
    !validateAuthNumber(authnumber) &&
    authnumber.length > 1 &&
    retry;
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
        <View style={emailFindScreenStyles.authorizeContainer}>
          <Image
            style={emailFindScreenStyles.checkImage}
            source={require('../../../../assets/images/check.png')}
          />
          <Text variant="h4" color="main">
            아이디 찾기 결과입니다!
          </Text>
        </View>
      )}
    </View>
  );
};

export default EmailFindScreen;
