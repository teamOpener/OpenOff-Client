import { create } from 'zustand';

interface StartEndDate {
  startDay: string;
  endDay: string;
}

export interface EventMapStore {
  startEndDate: StartEndDate;
  setStartEndDate: (date: StartEndDate) => void;
}

const initApp = {
  startEndDate: {
    startDay: '',
    endDay: '',
  },
};

export const useEventMapStore = create<EventMapStore>((set) => ({
  ...initApp,
  setStartEndDate: (payload) =>
    set((state) => ({
      ...state,
      startEndDate: {
        startDay: payload.startDay,
        endDay: payload.endDay,
      },
    })),
}));
