import queryKeys from 'constants/queryKeys';
import SortType from 'models/ledger/entity/SortType';

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

/**
 * 이벤트 신청 명단를 밀어당겨 refresh할 때 갱신합니다.
 */
const refreshLedgerList = ({
  eventIndexId,
  sortType,
  keyword,
}: {
  eventIndexId: number;
  sortType: SortType;
  keyword?: string;
}) => [
  queryKeys.hostKeys.statusByIndexId(eventIndexId),
  queryKeys.hostKeys.ledgerListByIndexId(eventIndexId, sortType, keyword),
];

const resetQueryKeys = {
  applyEvent,
  cancelParticipantEvent,
  refreshLedgerList,
};

export default resetQueryKeys;
