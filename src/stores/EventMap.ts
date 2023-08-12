import { create } from 'zustand';

interface StartEndDate {
  startDay: string;
  endDay: string;
}

export interface EventMapStore {
  startEndDate: StartEndDate;
  setStartEndDate: (date: StartEndDate) => void;
  resetStartEndDate: () => void;
}

const initEventMap = {
  startEndDate: {
    startDay: '',
    endDay: '',
  },
};

export const useEventMapStore = create<EventMapStore>((set) => ({
  ...initEventMap,
  setStartEndDate: (payload) =>
    set((state) => ({
      ...state,
      startEndDate: {
        startDay: payload.startDay,
        endDay: payload.endDay,
      },
    })),
  resetStartEndDate: () =>
    set((state) => ({
      ...state,
      startEndDate: {
        startDay: '',
        endDay: '',
      },
    })),
}));
