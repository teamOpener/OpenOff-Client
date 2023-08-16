import { create } from 'zustand';
import { EventFormError } from 'types/openEvent/EventFormError';
import { EventForm } from 'types/openEvent/EventForm';

export const initEventForm: EventForm = {
  field: [],
  title: null,
  applicationStartDate: null,
  applicationEndDate: null,
  eventDates: [],
  address: {
    roadAddress: null,
    detailAddress: null,
  },
  cost: 0,
  recruitmentNumber: null,
  description: null,
  imageBuilders: [],
  additionalInformation: [],
  hostName: null,
  staffIdList: [],
  hostPhoneNumber: null,
  hostEmail: null,
};

export const initEventFormErrMsg: EventFormError = {
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
  staffIdList: null,
  hostPhoneNumber: null,
  hostEmail: null,
};

export interface OpenEventStore {
  openEvent: EventForm;
  openEventErrorMessage: EventFormError;
  setOpenEvent: (props: EventForm) => void;
  setOpenEventErrorMessage: (props: EventFormError) => void;
  init: () => void;
}

export const useOpenEventStore = create<OpenEventStore>((set) => ({
  openEvent: initEventForm,
  openEventErrorMessage: initEventFormErrMsg,
  setOpenEvent: (openEvent) => set(() => ({ openEvent })),
  setOpenEventErrorMessage: (openEventErrorMessage) =>
    set(() => ({ openEventErrorMessage })),
  init: () =>
    set(() => ({
      openEvent: { ...initEventForm, imageBuilders: [] },
      openEventErrorMessage: initEventFormErrMsg,
    })),
}));
