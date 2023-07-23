import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import PhoneCertificationForm from 'components/authorize/forms/PhoneCertificationForm/PhoneCertificationForm';
import { useState } from 'react';
import { Image, View } from 'react-native';
import { validateAuthNumber, validatePhoneNumber } from 'utils/validate';
import emailFindScreenStyles from './EmailFindScreen.style';

const EmailFindScreen = () => {
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [authnumber, setAuthnumber] = useState<string>('');
  const [isAuthorize, setIsAuthorize] = useState<boolean>(false);
  const handleCertification = () => {
    console.log(phonenumber);
  };
  const handleAuthorizeFlow = () => {
    setIsAuthorize(true);
  };
  const isActive =
    !validatePhoneNumber(phonenumber) &&
    phonenumber.length > 1 &&
    !validateAuthNumber(authnumber) &&
    authnumber.length > 1;
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
            phonenumber={phonenumber}
            setPhonenumber={setPhonenumber}
            authnumber={authnumber}
            setAuthnumber={setAuthnumber}
            handleCertification={handleCertification}
          />
        </ScreenCover>
      ) : (
        <View style={emailFindScreenStyles.authorizeContainer}>
          <Image
            style={emailFindScreenStyles.checkImage}
            source={require('../../../../assets/images/check.png')}
          />
        </View>
      )}
    </View>
  );
};

export default EmailFindScreen;
