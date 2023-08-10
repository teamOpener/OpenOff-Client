import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import PhoneCertificationForm from 'components/authorize/forms/PhoneCertificationForm/PhoneCertificationForm';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import usePhoneCertificate from 'hooks/authorize/usePhoneCertificate';
import { useState } from 'react';
import { View } from 'react-native';
import { validateEmail } from 'utils/validate';
import PasswordResetScreen from '../PasswordResetScreen/PasswordResetScreen';
import passwordFindScreenStyles from './PasswordFindScreen.style';

const PasswordFindScreen = () => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  const { phonenumber, setPhonenumber, authnumber, setAuthnumber, isActive } =
    usePhoneCertificate();
  const [retry, setRetry] = useState<boolean>(false);
  const [isAuthorize, setIsAuthorize] = useState<boolean>(false);

  const isResetButtonActive = isActive && retry;

  const handleCertification = () => {
    setRetry(true);
  };

  const handleAuthorizeFlow = () => {
    setIsAuthorize(true);
  };

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
        <PasswordResetScreen />
      )}
    </View>
  );
};

export default PasswordFindScreen;
