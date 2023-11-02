import i18n from 'locales';

const validatePassword = (password: string) => {
  if (password) {
    const patternCnt = [
      { type: /^(?=.*?[a-zA-Z])/ },
      { type: /^(?=.*?[0-9]).{8,16}$/ },
      { type: /^(?=.*?[#?!@$%^&*-])/ },
    ].filter((item) => {
      return item.type.test(password);
    }).length;
    return patternCnt < 3 ? i18n.t('password_validator') : undefined;
  }
  return undefined;
};

const validateEmail = (email: string) => {
  if (email)
    return !/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
      ? i18n.t('email_validator')
      : undefined;
  return undefined;
};

const validateCount = (count: number) => {
  if (count) {
    if (count < 0) return false;
    if (count > 10) return false;
  }
  return undefined;
};

const validateBirthday = (birthday: string) => {
  if (birthday)
    return /^(19|20)\d\d-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/.test(birthday)
      ? undefined
      : i18n.t('birth_validator');
  return undefined;
};

const validateName = (name: string) => {
  // TODO 잠깐 품
  // if (name) {
  //   const patternCnt = [
  //     { type: /^(?=.*?[가-힣])/ },
  //     { type: /^.{2,8}$/ },
  //   ].filter((item) => {
  //     return item.type.test(name);
  //   }).length;
  //   return patternCnt < 2 ? '이름은 한글로만 구성해주세요.' : undefined;
  // }
  return undefined;
};

const validateNickname = (name: string) => {
  if (name) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,10}$/.test(name)
      ? undefined
      : i18n.t('nickname_validator');
  }
  return undefined;
};

const validatePhoneNumber = (phonenumber: string) => {
  if (phonenumber)
    return /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(phonenumber)
      ? undefined
      : i18n.t('phone_validator');
  return undefined;
};

const validatorOnlyPhoneNumber = (phoneNumber: string) =>
  /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(phoneNumber);

const validateAuthNumber = (phonenumber: string) => {
  if (phonenumber)
    return /^\d{4,6}$/.test(phonenumber)
      ? undefined
      : i18n.t('auth_number_validator');
  return undefined;
};

const validatePasswordCheck = (
  password: string | undefined,
  passwordCheck: string | undefined,
) =>
  password !== passwordCheck ? i18n.t('password_check_validator') : undefined;

export {
  validateAuthNumber,
  validateBirthday,
  validateCount,
  validateEmail,
  validateName,
  validateNickname,
  validatePassword,
  validatePasswordCheck,
  validatePhoneNumber,
  validatorOnlyPhoneNumber,
};
