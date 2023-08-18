import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import queryKeys from 'constants/queryKeys';
import { ApiErrorResponse } from 'types/ApiResponse';
import fakeApi from 'apis/test';
import MyTicketInfoResponseData from 'mocks/ledger/user/MyTicketInfoResponseData.json';
import { MyTicketInfoResponseDto } from 'models/ledger/response/MyTicketInfoResponseDto';
import { ApplicationInfoResponseDto } from 'models/ledger/response/ApplicationInfoResponseDto';
import ApplicationInfoResponseData from 'mocks/ledger/user/ApplicationInfoResponseData.json';
import { getHostEventLists } from 'apis/eventInstance';
import { FieldCode } from 'constants/code';
import {
  applyEvent,
  cancelPermittedApplicant,
  getLedgerStatus,
  getLedgerUserList,
  permitAllApplicant,
  permitApplicant,
} from 'apis/ledger';
import SortType from 'models/ledger/entity/SortType';
import { EventApplicantPermitRequestDto } from 'models/ledger/request/EventApplicantPermitRequestDto';
import { EventAllApplicantPermitRequestDto } from 'models/ledger/request/EventAllApplicantPermitRequestDto';
import { ApplyEventRequestDto } from 'models/ledger/request/ApplyEventRequestDto';

// TODO: 이벤트 상세 정보 조회
export const useUserTickets = (eventId: number) => {
  return useQuery(
    [...queryKeys.participantKeys.cardById(eventId)],
    () =>
      fakeApi<MyTicketInfoResponseDto[]>(
        MyTicketInfoResponseData as MyTicketInfoResponseDto[],
      ),
    { select: (data) => data.data },
  );
};

// TODO: 내 이벤트 - 참여 이벤트 리스트 조회
export const useUserTicketLists = () => {
  return useQuery(
    [...queryKeys.participantKeys.list],
    () =>
      fakeApi<ApplicationInfoResponseDto[]>(
        ApplicationInfoResponseData as unknown as ApplicationInfoResponseDto[],
      ),
    { select: (data) => data.data },
  );
};

export const useHostEventLists = (fieldType?: FieldCode) => {
  const query = useInfiniteQuery(
    fieldType
      ? [...queryKeys.hostKeys.listByFieldCode(fieldType)]
      : [...queryKeys.hostKeys.list],
    ({ pageParam = null }) =>
      getHostEventLists({
        eventInfoId: pageParam ?? undefined,
        fieldType,
      }),
    {
      getNextPageParam: (lastPage) => {
        const lastIdx = lastPage.data?.content.length;
        if (!lastIdx || !lastPage.data?.hasNext) {
          return false;
        }
        return lastPage.data?.content[lastIdx - 1].eventInfoId;
      },
    },
  );
  return query;
};

export const useLedgerStatus = (eventIndexId: number) => {
  return useQuery(
    [...queryKeys.hostKeys.statusByIndexId(eventIndexId)],
    () => getLedgerStatus({ eventIndexId }),
    {
      select: (data) => data.data,
    },
  );
};

// TODO 무한 스크롤을 위한 query parameter 수정
export const useLedgerUserList = (eventIndexId: number, sortType: SortType) => {
  const query = useInfiniteQuery(
    [...queryKeys.hostKeys.ledgerListByIndexId(eventIndexId, sortType)],
    ({ pageParam = null }) =>
      getLedgerUserList({
        eventIndexId,
        sort: sortType,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.last) {
          return false;
        }

        const page = lastPage.data.pageNumber;
        return page + 1;
      },
    },
  );
  return query;
};

export const usePermitApplicant = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    (data: EventApplicantPermitRequestDto) => permitApplicant(data),
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};

export const useCancelPermittedApplicant = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    (data: EventApplicantPermitRequestDto) => cancelPermittedApplicant(data),
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};

export const usePermitAllApplicant = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    (data: EventAllApplicantPermitRequestDto) => permitAllApplicant(data),
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};

export const useApplyEvent = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((data: ApplyEventRequestDto) => applyEvent(data), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
  });
};
