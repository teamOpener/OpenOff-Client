import { useState } from 'react';
import { validateAuthNumber, validatePhoneNumber } from 'utils/validate';

const usePhoneCertificate = () => {
  const [authnumber, setAuthnumber] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [retry, setRetry] = useState<boolean>(false);
  const isActive =
    !validatePhoneNumber(phonenumber) &&
    phonenumber.length > 1 &&
    !validateAuthNumber(authnumber) &&
    authnumber.length > 1 &&
    retry;
  return {
    isActive,
    authnumber,
    setAuthnumber,
    phonenumber,
    setPhonenumber,
    retry,
    setRetry,
  };
};

export default usePhoneCertificate;
