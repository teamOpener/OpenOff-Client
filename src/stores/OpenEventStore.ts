import { create } from 'zustand';
import { EventBuilderError } from 'types/openEvent/EventBuilderError';
import { EventBuilder } from 'types/openEvent/EventBuilder';

const initEventBuilder: EventBuilder = {
  field: [],
  title: null,
  applicationStartDate: null,
  applicationEndDate: null,
  eventDates: [],
  address: {
    roadAddress: null,
    detailAddress: null,
  },
  cost: null,
  recruitmentNumber: null,
  description: null,
  imageUrls: [],
  additionalInformation: [],
  hostName: null,
  hostPhoneNumber: null,
  hostEmail: null,
};

export const initEventBuilderErrMsg: EventBuilderError = {
  field: null,
  title: null,
  applicationPeriod: null,
  eventDates: null,
  address: null,
  cost: null,
  recruitmentNumber: null,
  description: null,
  imageUrls: null,
  additionalInformation: null,
  hostName: null,
  hostPhoneNumber: null,
  hostEmail: null,
};

export interface OpenEventStore {
  openEvent: EventBuilder;
  openEventErrorMessage: EventBuilderError;
  setOpenEvent: (props: EventBuilder) => void;
  setOpenEventErrorMessage: (props: EventBuilderError) => void;
  init: () => void;
}

export const useOpenEventStore = create<OpenEventStore>((set) => ({
  openEvent: initEventBuilder,
  openEventErrorMessage: initEventBuilderErrMsg,
  setOpenEvent: (openEvent) => set(() => ({ openEvent })),
  setOpenEventErrorMessage: (openEventErrorMessage) =>
    set(() => ({ openEventErrorMessage })),
  init: () =>
    set(() => ({
      openEvent: initEventBuilder,
      openEventErrorMessage: initEventBuilderErrMsg,
    })),
}));
