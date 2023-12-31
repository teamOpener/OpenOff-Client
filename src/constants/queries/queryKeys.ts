import SortType from 'models/ledger/entity/SortType';
import { FieldCode } from '../interest/interest';

const DOMAIN = {
  USER: 'USER',
  EVENT: 'EVENT',
  PARTICIPANT: 'PARTICIPANT',
  HOST: 'HOST',
  BANNER: 'BANNER',
  BOOKMARK: 'BOOKMARK',
  COMMENT: 'COMMENT',
  LEDGER: 'LEDGER',
  INTEREST: 'INTEREST',
};

const userKeys = {
  all: [DOMAIN.USER],
  myInfo: [DOMAIN.USER, 'my-info'],
  findUser: (keyword: string) => [DOMAIN.USER, 'others-info', keyword],
};

const bannerKeys = {
  all: [DOMAIN.BANNER],
};

const eventKeys = {
  all: [DOMAIN.EVENT],
  details: [DOMAIN.EVENT, 'detail'],
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
  ledgerListByIndexId: (
    eventIndexId: number,
    sortType: SortType,
    keyword?: string,
  ) => [DOMAIN.HOST, 'ledger-list', sortType, eventIndexId, keyword],
  applicantQnAbyLedgerId: (ledgerId: number) => [DOMAIN.HOST, 'qna', ledgerId],
};

const bookmarkKeys = {
  all: [DOMAIN.BOOKMARK],
  list: [DOMAIN.BOOKMARK, 'list'],
};

const commentKeys = {
  all: [DOMAIN.COMMENT],
  byEventInfoId: (eventInfoId: number) => [DOMAIN.COMMENT, eventInfoId],
  parentCommentsByEventInfoId: (eventInfoId: number) => [
    DOMAIN.COMMENT,
    eventInfoId,
    'parents',
  ],
  childCommentsByEventInfoId: (eventInfoId: number, parentId: number) => [
    DOMAIN.COMMENT,
    eventInfoId,
    'children',
    parentId,
  ],
};

const ledgerKeys = {
  all: [DOMAIN.LEDGER],
  staffByEventInfoId: (eventInfoId: number) => [
    DOMAIN.LEDGER,
    'staff',
    eventInfoId,
  ],
};

const interestKeys = {
  all: [DOMAIN.INTEREST],
  info: [DOMAIN.INTEREST, 'info'],
};

const queryKeys = {
  userKeys,
  eventKeys,
  participantKeys,
  hostKeys,
  bookmarkKeys,
  commentKeys,
  ledgerKeys,
  bannerKeys,
  interestKeys,
};

export default queryKeys;
