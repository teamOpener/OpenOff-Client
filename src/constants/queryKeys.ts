import SortType from 'models/ledger/entity/SortType';
import { FieldCode } from './code';

const DOMAIN = {
  USER: 'USER',
  EVENT: 'EVENT',
  PARTICIPANT: 'PARTICIPANT',
  HOST: 'HOST',
  BOOKMARK: 'BOOKMARK',
};

const userKeys = {
  all: [DOMAIN.USER],
  myInfo: [DOMAIN.USER, 'my-info'],
  findUser: (keyword: string) => [DOMAIN.USER, 'others-info', keyword],
};

const eventKeys = {
  all: [DOMAIN.EVENT],
  byId: (id: number) => [DOMAIN.EVENT, 'detail', id],
  personalList: [DOMAIN.EVENT, 'personal-list'],
  vogueList: [DOMAIN.EVENT, 'vogue-list'],
  vogueInfiniteList: [DOMAIN.EVENT, 'vogue-infinite-list'],
  mapList: [DOMAIN.EVENT, 'map-list'],
  listByField: (type: FieldCode) => [DOMAIN.EVENT, 'list', type],
};

const participantKeys = {
  all: [DOMAIN.PARTICIPANT],
  list: [DOMAIN.PARTICIPANT, 'list'],
  listByFieldCode: (type: FieldCode) => [DOMAIN.PARTICIPANT, 'list', type],
  cardById: (eventId: number) => [DOMAIN.PARTICIPANT, 'list', eventId, 'card'],
};

const hostKeys = {
  all: [DOMAIN.HOST],
  list: [DOMAIN.HOST, 'list'],
  listByFieldCode: (type: FieldCode) => [DOMAIN.HOST, 'list', type],
  statusByIndexId: (eventIndexId: number) => [
    DOMAIN.HOST,
    'status',
    eventIndexId,
  ],
  ledgerList: [DOMAIN.HOST, 'ledger-list'],
  ledgerListByIndexId: (eventIndexId: number, sortType: SortType) => [
    DOMAIN.HOST,
    'ledger-list',
    sortType,
    eventIndexId,
  ],
  applicantQnAbyLedgerId: (ledgerId: number) => [DOMAIN.HOST, 'qna', ledgerId],
};

const bookmarkKeys = {
  all: [DOMAIN.BOOKMARK],
  list: [DOMAIN.BOOKMARK, 'list'],
};

const queryKeys = {
  userKeys,
  eventKeys,
  participantKeys,
  hostKeys,
  bookmarkKeys,
};

export default queryKeys;
