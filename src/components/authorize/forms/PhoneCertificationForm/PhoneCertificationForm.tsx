import PhoneAuthButton from 'components/authorize/buttons/PhoneAuthButton/PhoneAuthButton';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import TimerText from 'components/authorize/texts/TimerText/TimerText';
import i18n from 'locales';
import { Dispatch, SetStateAction, useState } from 'react';
import { validateAuthNumber, validatePhoneNumber } from 'utils/validate';

interface Trigger {
  active: boolean;
  reactive: boolean;
}

interface Props {
  phonenumber: string;
  setPhonenumber: Dispatch<SetStateAction<string>>;
  authnumber: string;
  setAuthnumber: Dispatch<SetStateAction<string>>;
  handleCertification: () => void;
  retry: boolean;
  setRetry: Dispatch<SetStateAction<boolean>>;
}

const PhoneCertificationForm = ({
  handleCertification,
  phonenumber,
  setPhonenumber,
  authnumber,
  setAuthnumber,
  retry,
  setRetry,
}: Props) => {
  const [timerTrigger, setTimerTrigger] = useState<Trigger>({
    active: false,
    reactive: false,
  });
  return (
    <>
      <EssentialInput
        validation={validatePhoneNumber}
        label={i18n.t('phone_number')}
        keyboardType="number-pad"
        value={phonenumber}
        setValue={setPhonenumber}
        type="phonenumber"
      >
        <PhoneAuthButton
          label={retry ? i18n.t('resend') : i18n.t('get_certified')}
          active={!(validatePhoneNumber(phonenumber) || phonenumber.length < 2)}
          handlePress={() => {
            if (!timerTrigger.active) {
              setTimerTrigger({ ...timerTrigger, active: true });
            } else {
              setTimerTrigger({
                ...timerTrigger,
                reactive: !timerTrigger.reactive,
              });
            }
            handleCertification();
          }}
        />
      </EssentialInput>
      <EssentialInput
        validation={validateAuthNumber}
        label={i18n.t('certification_number')}
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
    </>
  );
};

export default PhoneCertificationForm;
