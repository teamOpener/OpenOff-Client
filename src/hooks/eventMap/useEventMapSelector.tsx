import {
  ApplicationAbleValue,
  ParticipantValue,
  PayValue,
  SelectStatus,
} from 'constants/app/selectBox';
import MENT_EVENT_MAP from 'constants/eventMap/eventMapMessage';
import i18n from 'locales';
import EventSearchRequestDto from 'models/event/request/EventSearchRequestDto';
import { Reducer, useReducer, useState } from 'react';
import { useEventMapStore } from 'stores/EventMap';
import { Action, SelectBox } from 'types/apps/selectbox';
import { Coordinate } from 'types/event';
import { Field } from 'types/interest';

interface SortInfo {
  dialog: boolean;
  value: string;
}

const initSelect: SelectBox = {
  payOption: {
    label: i18n.t('event_map.all'),
    value: 'all',
  },
  participantOption: {
    label: i18n.t('event_map.all'),
    value: 'all',
  },
  applicationAbleOption: {
    label: i18n.t('event_map.all'),
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
    case SelectStatus.REMIND_SELECT:
      return state;
    default:
      return state;
  }
};
const useEventMapSelector = (
  screenCoordinate: Coordinate,
  currentCoordinate: Coordinate,
  focusCoordinate: Coordinate,
  eventIdParam?: string,
  fieldMapMode?: Field,
) => {
  const { startEndDate } = useEventMapStore();
  const [sort, setSort] = useState<SortInfo>({
    dialog: false,
    value: 'date',
  });
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectState, selectDispatch] = useReducer<Reducer<SelectBox, Action>>(
    selectReducer,
    initSelect,
  );

  const payValueTransform = (value: string) =>
    value === PayValue.FREE ? 0 : 1;

  const applyableValueTransform = (value: string) =>
    value === ApplicationAbleValue.APPLYING;

  // 쿼리 파라메터 계산 함수
  const calculateQueryParams = (): EventSearchRequestDto => {
    const appAble =
      selectState.applicationAbleOption.value === ApplicationAbleValue.ALL
        ? undefined
        : applyableValueTransform(selectState.applicationAbleOption.value);

    const part =
      selectState.participantOption.value === ParticipantValue.ALL
        ? undefined
        : selectState.participantOption.value;

    const pay =
      selectState.payOption.value === PayValue.ALL
        ? undefined
        : payValueTransform(selectState.payOption.value);

    const commonCoordinate: Coordinate =
      searchValue || startEndDate.startDay
        ? screenCoordinate
        : currentCoordinate;

    const calculateCoordinate: Coordinate = fieldMapMode?.value
      ? focusCoordinate
      : commonCoordinate;

    return {
      startDate: startEndDate.startDay
        ? `${startEndDate.startDay} 00:00:00`
        : undefined,
      endDate: startEndDate.endDay
        ? `${startEndDate.endDay} 00:00:00`
        : undefined,
      applyable: appAble,
      capacity: part,
      eventFee: pay,
      keyword: searchValue.length === 0 ? undefined : searchValue,
      field: fieldMapMode?.value,
      eventId: eventIdParam,
      latitude: Math.abs(
        Math.round(calculateCoordinate.latitude * 1000000) / 1000000,
      ),
      longitude: Math.abs(
        Math.round(calculateCoordinate.longitude * 1000000) / 1000000,
      ),
    };
  };
  return {
    sort,
    setSort,
    selectState,
    selectDispatch,
    searchValue,
    setSearchValue,
    calculateQueryParams,
  };
};

export default useEventMapSelector;
