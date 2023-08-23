import queryKeys from 'constants/queryKeys';

/**
 * 이벤트 신청 후에 갱신되어야 합니다.
 */
const applyEvent = [
  queryKeys.eventKeys.all,
  queryKeys.bookmarkKeys.all,
  queryKeys.participantKeys.all,
  queryKeys.hostKeys.all,
];

const resetQueryKeys = {
  applyEvent,
};

export default resetQueryKeys;
