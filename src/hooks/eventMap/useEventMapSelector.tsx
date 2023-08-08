import SelectStatus from 'constants/selectBox';
import { Reducer, useReducer, useState } from 'react';
import { Action, SelectBox } from 'types/apps/selectbox';
import { Event } from 'types/event';

interface SortInfo {
  dialog: boolean;
  value: string;
}

const initSelect: SelectBox = {
  payOption: {
    label: '전체',
    value: 'all',
  },
  participantOption: {
    label: '전체',
    value: 'all',
  },
  applicationAbleOption: {
    label: '전체',
    value: 'all',
  },
};

const selectReducer = (state: SelectBox, action: Action): SelectBox => {
  switch (action.type) {
    case SelectStatus.SET_PAY_OPTION:
      return { ...state, payOption: action.option };
    case SelectStatus.SET_PARTICIPANT_OPTION:
      return { ...state, participantOption: action.option };
    case SelectStatus.SET_APPLICATION_ABLE_OPTION:
      return { ...state, applicationAbleOption: action.option };
    case SelectStatus.RESET_SELECT:
      return { ...initSelect };
    default:
      return state;
  }
};
const useEventMapSelector = (eventList: Event[]) => {
  const [sort, setSort] = useState<SortInfo>({
    dialog: false,
    value: 'date',
  });
  const [selectState, selectDispatch] = useReducer<Reducer<SelectBox, Action>>(
    selectReducer,
    initSelect,
  );
  return {
    sort,
    setSort,
    selectState,
    selectDispatch,
  };
};

export default useEventMapSelector;
