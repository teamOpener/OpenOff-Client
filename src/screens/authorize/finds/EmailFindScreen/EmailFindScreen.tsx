import PhoneCertificationForm from 'components/authorize/forms/PhoneCertificationForm/PhoneCertificationForm';
import React, { useState } from 'react';
import { View, Image } from 'react-native';
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
  return (
    <View style={emailFindScreenStyles.container}>
      {!isAuthorize ? (
        <PhoneCertificationForm
          phonenumber={phonenumber}
          setPhonenumber={setPhonenumber}
          authnumber={authnumber}
          setAuthnumber={setAuthnumber}
          handleCertification={handleCertification}
          handleAuthorizeFlow={handleAuthorizeFlow}
        />
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
