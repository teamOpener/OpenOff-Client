import { UserInfoStatus } from 'constants/authorize/join';
import { Field } from './interest';

interface EmailPassword {
  email: string;
  password: string;
}

type Gender = 'MAN' | 'WOMAN';

type Action =
  | {
      type: UserInfoStatus.SET_NAME;
      username: string;
    }
  | { type: UserInfoStatus.SET_BIRTH; birth: string }
  | {
      type: UserInfoStatus.SET_EMAIL_ADDRESS_PASSWORD;
      emailPassword: EmailPassword;
    }
  | { type: UserInfoStatus.SET_GENDER; gender: Gender }
  | { type: UserInfoStatus.SET_INTEREST_FIELD; interestField: Field[] }
  | { type: UserInfoStatus.SET_AGREE_TO_TERM; term: 'Y' | 'N' }
  | { type: UserInfoStatus.SET_NICK_NAME; nickname: string }
  | { type: UserInfoStatus.SET_PHONE_NUMBER; phoneNumber: string };
interface JoinInfo {
  username: string;
  birth: string;
  agreeToTerm: string;
  phoneNumber: string;
  gender: Gender;
  nickname: string;
  emailAddress: string;
  password: string;
  interestField: Field[];
}

interface PasswordValue {
  password: string;
  passwordCheck: string;
}

export type { Action, Gender, JoinInfo, PasswordValue };
