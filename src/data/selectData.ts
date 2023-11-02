import {
  ApplicationAbleValue,
  ParticipantValue,
  PayValue,
} from 'constants/app/selectBox';
import i18n from 'locales';
import { Option } from 'types/apps/selectbox';

const payOptions: Option[] = [
  {
    label: i18n.t('event_map.all'),
    value: PayValue.ALL,
  },
  {
    label: i18n.t('event_map.pay'),
    value: PayValue.PAY,
  },
  {
    label: i18n.t('event_map.free'),
    value: PayValue.FREE,
  },
];

const participantOptions: Option[] = [
  {
    label: i18n.t('event_map.all'),
    value: ParticipantValue.ALL,
  },
  {
    label: i18n.t('event_map.small'),
    value: ParticipantValue.SMALL,
  },
  {
    label: i18n.t('event_map.medium'),
    value: ParticipantValue.MEDIUM,
  },
  {
    label: i18n.t('event_map.large'),
    value: ParticipantValue.LARGE,
  },
  {
    label: i18n.t('event_map.huge'),
    value: ParticipantValue.HUGE,
  },
];

const applicationAbleOptions: Option[] = [
  {
    label: i18n.t('event_map.all'),
    value: ApplicationAbleValue.ALL,
  },
  {
    label: i18n.t('event_map.applying'),
    value: ApplicationAbleValue.APPLYING,
  },
  {
    label: i18n.t('event_map.deadline'),
    value: ApplicationAbleValue.DEADLINE,
  },
];

export { applicationAbleOptions, participantOptions, payOptions };
