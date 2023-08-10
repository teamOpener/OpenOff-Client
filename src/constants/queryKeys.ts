import { FieldCode } from './code';

const DOMAIN = {
  USER: 'USER',
  EVENT: 'EVENT',
  PARTICIPANT: 'PARTICIPANT',
  HOST: 'HOST',
};

const userKeys = {
  all: [DOMAIN.USER],
};

const eventKeys = {
  all: [DOMAIN.EVENT],
  byId: (id: number) => [DOMAIN.EVENT, 'detail', id],
};

const participantKeys = {
  all: [DOMAIN.PARTICIPANT],
  list: [DOMAIN.PARTICIPANT, 'list'],
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
};

const queryKeys = {
  userKeys,
  eventKeys,
  participantKeys,
  hostKeys,
};

export default queryKeys;
