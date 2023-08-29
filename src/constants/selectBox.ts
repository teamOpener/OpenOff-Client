const enum SelectStatus {
  SET_APPLICATION_ABLE_OPTION = 'SET_APPLICATION_ABLE_OPTION',
  SET_PARTICIPANT_OPTION = 'SET_PARTICIPANT_OPTION',
  SET_PAY_OPTION = 'SET_PAY_OPTION',
  RESET_SELECT = 'RESET_SELECT',
  REMIND_SELECT = 'REMIND_SELECT',
}

const enum PayValue {
  ALL = 'all',
  PAY = 'pay',
  FREE = 'free',
}

const enum ParticipantValue {
  ALL = 'all',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  HUGE = 'HUGE',
}

const enum ApplicationAbleValue {
  ALL = 'all',
  APPLYING = 'applying',
  DEADLINE = 'deadline',
}

export { ApplicationAbleValue, ParticipantValue, PayValue, SelectStatus };
