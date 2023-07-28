import { create } from 'zustand';
import { CreateEventDto } from 'types/apis/CreateEvent.dto';

export interface OpenEventErrorMessage {
  field: string | null;
  title: string | null;
  applicationPeriod: string | null;
  eventDates: string | null;
  address: string | null;
  cost: string | null;
  recruitmentNumber: string | null;
  description: string | null;
  imageUrls: string | null;
  additionalInformation: string | null;
  host: {
    name: string | null;
    phoneNumber: string | null;
    email: string | null;
  };
}

const initOpenEvent: CreateEventDto = {
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
  imageUrls: [],
  additionalInformation: [],
  host: {
    name: null,
    phoneNumber: null,
    email: null,
  },
};

export const initOpenEventErrorMessage: OpenEventErrorMessage = {
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
  host: {
    name: null,
    phoneNumber: null,
    email: null,
  },
};

export interface OpenEventStore {
  openEvent: CreateEventDto;
  openEventErrorMessage: OpenEventErrorMessage;
  setOpenEvent: (props: CreateEventDto) => void;
  setOpenEventErrorMessage: (props: OpenEventErrorMessage) => void;
  init: () => void;
}

export const useOpenEventStore = create<OpenEventStore>((set) => ({
  openEvent: initOpenEvent,
  openEventErrorMessage: initOpenEventErrorMessage,
  setOpenEvent: (openEvent) => set(() => ({ openEvent })),
  setOpenEventErrorMessage: (openEventErrorMessage) =>
    set(() => ({ openEventErrorMessage })),
  init: () =>
    set(() => ({
      openEvent: initOpenEvent,
      openEventErrorMessage: initOpenEventErrorMessage,
    })),
}));
