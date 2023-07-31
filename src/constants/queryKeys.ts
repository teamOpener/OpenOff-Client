const DOMAIN = {
  USER: 'USER',
  EVENT: 'EVENT',
};

const userKeys = {
  all: [DOMAIN.USER],
};

const eventKeys = {
  all: [DOMAIN.EVENT],
  byId: (id: number) => [DOMAIN.EVENT, 'detail', id],
};

const queryKeys = {
  userKeys,
  eventKeys,
};

export default queryKeys;
