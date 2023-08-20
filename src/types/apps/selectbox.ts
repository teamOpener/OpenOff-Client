import { SelectStatus } from 'constants/selectBox';

interface Option {
  label: string;
  value: string;
}

interface SelectBox {
  payOption: Option;
  participantOption: Option;
  applicationAbleOption: Option;
}

type Action =
  | { type: SelectStatus.SET_PAY_OPTION; option: Option }
  | { type: SelectStatus.SET_PARTICIPANT_OPTION; option: Option }
  | { type: SelectStatus.SET_APPLICATION_ABLE_OPTION; option: Option }
  | { type: SelectStatus.RESET_SELECT }
  | { type: SelectStatus.REMIND_SELECT };
export type { Action, Option, SelectBox };
