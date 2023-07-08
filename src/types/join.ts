interface Action {
  type: string;
  value: string | string[];
}

interface JoinInfo {
  name: string;
  birth: string;
  agreeToTerm: string;
  phoneNumber: string;
  gender: string;
  emailAddress: string;
  password: string;
  interestField: string[];
}

export type { Action, JoinInfo };
