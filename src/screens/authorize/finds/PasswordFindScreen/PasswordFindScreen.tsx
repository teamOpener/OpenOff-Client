import PhoneAuthButton from 'components/authorize/buttons/PhoneAuthButton/PhoneAuthButton';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import TimerText from 'components/authorize/texts/TimerText/TimerText';
import { useState } from 'react';
import { View } from 'react-native';
import {
  validateAuthNumber,
  validateEmail,
  validatePhoneNumber,
} from 'utils/validate';
import PasswordResetScreen from '../PasswordResetScreen/PasswordResetScreen';
import passwordFindScreenStyles from './PasswordFindScreen.style';

interface Trigger {
  active: boolean;
  reactive: boolean;
}

const PasswordFindScreen = () => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [authnumber, setAuthnumber] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [retry, setRetry] = useState<boolean>(false);
  const [timerTrigger, setTimerTrigger] = useState<Trigger>({
    active: false,
    reactive: false,
  });
  const [isAuthorize, setIsAuthorize] = useState<boolean>(false);

  const isActive =
    !validateEmail(emailAddress) &&
    emailAddress.length > 1 &&
    !validatePhoneNumber(phonenumber) &&
    phonenumber.length > 1 &&
    !validateAuthNumber(authnumber) &&
    authnumber.length > 1 &&
    retry;

  const handleCertification = () => {
    setRetry(true);
    if (!timerTrigger.active) {
      setTimerTrigger({ ...timerTrigger, active: true });
      return;
    }
    setTimerTrigger({
      ...timerTrigger,
      reactive: !timerTrigger.reactive,
    });
    console.log(phonenumber);
  };

  const handleAuthorizeFlow = () => {
    setTimerTrigger(() => {
      return { reactive: false, active: false };
    });
    setIsAuthorize(true);
  };

  return (
    <View style={passwordFindScreenStyles.container}>
      {!isAuthorize ? (
        <ScreenCover
          authorizeButton={{
            handlePress: handleAuthorizeFlow,
            label: '다음',
            isActive,
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
          <EssentialInput
            validation={validatePhoneNumber}
            label="휴대폰 번호"
            keyboardType="number-pad"
            value={phonenumber}
            setValue={setPhonenumber}
            type="phonenumber"
          >
            <PhoneAuthButton
              label={retry ? '재발송' : '인증받기'}
              active={
                !(validatePhoneNumber(phonenumber) || phonenumber.length < 2)
              }
              handlePress={handleCertification}
            />
          </EssentialInput>
          <EssentialInput
            validation={validateAuthNumber}
            label="인증번호"
            keyboardType="number-pad"
            value={authnumber}
            setValue={setAuthnumber}
            type="authnumber"
          >
            {timerTrigger.active && (
              <TimerText
                timerTrigger={timerTrigger}
                setTimerTrigger={setTimerTrigger}
                setRetry={setRetry}
              />
            )}
          </EssentialInput>
        </ScreenCover>
      ) : (
        <PasswordResetScreen />
      )}
    </View>
  );
};

export default PasswordFindScreen;
