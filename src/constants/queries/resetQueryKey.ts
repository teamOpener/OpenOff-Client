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

/**
 * 신청자가 이벤트 신청 취소시
 */
const cancelParticipantEvent = ({
  eventInfoId,
  eventIndexId,
}: {
  eventInfoId: number;
  eventIndexId: number;
}) => [
  queryKeys.hostKeys.all,
  queryKeys.eventKeys.byId(eventInfoId),
  queryKeys.participantKeys.list,
  queryKeys.hostKeys.statusByIndexId(eventIndexId),
  queryKeys.hostKeys.ledgerList,
];

const resetQueryKeys = {
  applyEvent,
  cancelParticipantEvent,
};

export default resetQueryKeys;
