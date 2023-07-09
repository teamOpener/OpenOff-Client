interface Action {
  type: string;
  value: string | (string | undefined)[];
}

interface JoinInfo {
  name: string;
  birth: string;
  agreeToTerm: string;
  phoneNumber: string;
  gender: string;
  nickname: string;
  emailAddress: string;
  password: string;
  interestField: (string | undefined)[];
}

export type { Action, JoinInfo };
