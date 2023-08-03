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

const queryKeys = {
  userKeys,
  eventKeys,
  participantKeys,
};

export default queryKeys;
