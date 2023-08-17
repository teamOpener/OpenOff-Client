import {
  ApplicationAbleValue,
  ParticipantValue,
  PayValue,
} from 'constants/selectBox';
import { Option } from 'types/apps/selectbox';

const payOptions: Option[] = [
  {
    label: '전체',
    value: PayValue.ALL,
  },
  {
    label: '유료',
    value: PayValue.PAY,
  },
  {
    label: '무료',
    value: PayValue.FREE,
  },
];

const participantOptions: Option[] = [
  {
    label: '전체',
    value: ParticipantValue.ALL,
  },
  {
    label: '20인 미만',
    value: ParticipantValue.SMALL,
  },
  {
    label: '20인 ~ 50인',
    value: ParticipantValue.MEDIUM,
  },
  {
    label: '50인 ~ 100인',
    value: ParticipantValue.LARGE,
  },
  {
    label: '100인 이상',
    value: ParticipantValue.HUGE,
  },
];

const applicationAbleOptions: Option[] = [
  {
    label: '전체',
    value: ApplicationAbleValue.ALL,
  },
  {
    label: '신청중',
    value: ApplicationAbleValue.APPLYING,
  },
  {
    label: '신청마감',
    value: ApplicationAbleValue.DEADLINE,
  },
];

export { applicationAbleOptions, participantOptions, payOptions };
