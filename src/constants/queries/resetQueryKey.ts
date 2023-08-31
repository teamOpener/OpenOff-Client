import { FieldCode } from 'constants/interest';
import queryKeys from 'constants/queries/queryKeys';
import SortType from 'models/ledger/entity/SortType';

/**
 * 알림이 울릴 때 갱신되어야 합니다.
 TODO 알림 종류에 따라 다르게
 */
const all = [
  queryKeys.eventKeys.all,
  queryKeys.participantKeys.all,
  queryKeys.hostKeys.all,
  queryKeys.bookmarkKeys.all,
  queryKeys.commentKeys.all,
  queryKeys.ledgerKeys.all,
];

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

/**
 * 유저가 내 이벤트 탭 참여 이벤트 리스트를 밀어당겨 refresh할 때 갱신합니다.
 */
const refreshUserEventList = (code?: FieldCode) => {
  if (code) {
    return [queryKeys.participantKeys.listByFieldCode(code)];
  }
  return [queryKeys.participantKeys.list];
};

/**
 * 유저가 내 이벤트 탭 주최 이벤트 리스트를 밀어당겨 refresh할 때 갱신합니다.
 */
const refreshHostEventList = (code?: FieldCode) => {
  if (code) {
    return [queryKeys.hostKeys.listByFieldCode(code)];
  }
  return [queryKeys.hostKeys.list];
};

const resetQueryKeys = {
  all,
  applyEvent,
  cancelParticipantEvent,
  refreshLedgerList,
  refreshUserEventList,
  refreshHostEventList,
};

export default resetQueryKeys;
