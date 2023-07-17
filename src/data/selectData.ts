import Option from 'types/apps/selectbox';

const payOptions: Option[] = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '유료',
    value: 'pay',
  },
  {
    label: '무료',
    value: 'free',
  },
];

const participantOptions: Option[] = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '20인 미만',
    value: '20',
  },
  {
    label: '20인 ~ 50인',
    value: '20to50',
  },
  {
    label: '50인 ~ 100인',
    value: '50to100',
  },
  {
    label: '100인 이상',
    value: '100',
  },
];

const applicationAbleOptions: Option[] = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '신청중',
    value: 'applying',
  },
  {
    label: '신청마감',
    value: 'deadline',
  },
];

export { applicationAbleOptions, participantOptions, payOptions };
