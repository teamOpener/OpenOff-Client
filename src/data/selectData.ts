import {
  ApplicationAbleValue,
  ParticipantValue,
  PayValue,
} from 'constants/app/selectBox';
import MENT_EVENT_MAP from 'constants/eventMap/eventMapMessage';
import { Option } from 'types/apps/selectbox';

const payOptions: Option[] = [
  {
    label: MENT_EVENT_MAP.MAIN.SELECT_BOX.ALL,
    value: PayValue.ALL,
  },
  {
    label: MENT_EVENT_MAP.MAIN.SELECT_BOX.PAY.PAY,
    value: PayValue.PAY,
  },
  {
    label: MENT_EVENT_MAP.MAIN.SELECT_BOX.PAY.FREE,
    value: PayValue.FREE,
  },
];

const participantOptions: Option[] = [
  {
    label: MENT_EVENT_MAP.MAIN.SELECT_BOX.ALL,
    value: ParticipantValue.ALL,
  },
  {
    label: MENT_EVENT_MAP.MAIN.SELECT_BOX.PARTICIPANT.SMALL,
    value: ParticipantValue.SMALL,
  },
  {
    label: MENT_EVENT_MAP.MAIN.SELECT_BOX.PARTICIPANT.MEDIUM,
    value: ParticipantValue.MEDIUM,
  },
  {
    label: MENT_EVENT_MAP.MAIN.SELECT_BOX.PARTICIPANT.LARGE,
    value: ParticipantValue.LARGE,
  },
  {
    label: MENT_EVENT_MAP.MAIN.SELECT_BOX.PARTICIPANT.HUGE,
    value: ParticipantValue.HUGE,
  },
];

const applicationAbleOptions: Option[] = [
  {
    label: MENT_EVENT_MAP.MAIN.SELECT_BOX.ALL,
    value: ApplicationAbleValue.ALL,
  },
  {
    label: MENT_EVENT_MAP.MAIN.SELECT_BOX.APPLICATION_ABLE.APPLYING,
    value: ApplicationAbleValue.APPLYING,
  },
  {
    label: MENT_EVENT_MAP.MAIN.SELECT_BOX.APPLICATION_ABLE.DEADLINE,
    value: ApplicationAbleValue.DEADLINE,
  },
];

export { applicationAbleOptions, participantOptions, payOptions };
