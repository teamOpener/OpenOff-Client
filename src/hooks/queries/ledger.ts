import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import queryKeys from 'constants/queryKeys';
import { ApiErrorResponse } from 'types/ApiResponse';
import { getHostEventLists } from 'apis/eventInstance';
import { FieldCode } from 'constants/code';
import {
  applyEvent,
  cancelApplicationEvent,
  cancelPermittedApplicant,
  checkQR,
  denyApplicationUser,
  getApplicantQnA,
  getApplicationInfo,
  getEventTickets,
  getLedgerStatus,
  getLedgerUserList,
  permitAllApplicant,
  permitApplicant,
} from 'apis/ledger';
import SortType from 'models/ledger/entity/SortType';
import { EventApplicantPermitRequestDto } from 'models/ledger/request/EventApplicantPermitRequestDto';
import { EventAllApplicantPermitRequestDto } from 'models/ledger/request/EventAllApplicantPermitRequestDto';
import { ApplyEventRequestDto } from 'models/ledger/request/ApplyEventRequestDto';
import { EventApplicationDenyRequestDto } from 'models/ledger/request/EventApplicationDenyRequestDto';
import { ApplicantApplyDetailRequestDto } from 'models/ledger/request/ApplicantApplyDetailRequestDto';
import { MyTicketInfoRequestDto } from 'models/ledger/request/MyTicketInfoRequestDto';
import { QRCheckRequestDto } from 'models/ledger/request/QRCheckRequestDto';
import { ApplicationCancelRequestDto } from 'models/ledger/request/ApplicationCancelRequestDto';

export const useUserTickets = ({ eventInfoId }: MyTicketInfoRequestDto) => {
  return useQuery(
    [...queryKeys.participantKeys.cardById(eventInfoId)],
    () => getEventTickets({ eventInfoId }),
    { select: (data) => data.data },
  );
};

// TODO: 내 이벤트 - 참여 이벤트 리스트 조회
export const useUserTicketLists = (fieldType?: FieldCode) => {
  const query = useInfiniteQuery(
    fieldType
      ? [...queryKeys.participantKeys.listByFieldCode(fieldType)]
      : [...queryKeys.participantKeys.list],
    ({ pageParam = null }) =>
      getApplicationInfo({
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

export const useDenyApplicationUser = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    (data: EventApplicationDenyRequestDto) => denyApplicationUser(data),
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};

export const useApplicantQnA = ({
  ledgerId,
}: ApplicantApplyDetailRequestDto) => {
  return useQuery(
    [...queryKeys.hostKeys.applicantQnAbyLedgerId(ledgerId)],
    () => getApplicantQnA({ ledgerId }),
    {
      select: (data) => data.data,
    },
  );
};

export const useCheckQR = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((data: QRCheckRequestDto) => checkQR(data), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
  });
};

export const useCancelApplicationEvent = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    (data: ApplicationCancelRequestDto) => cancelApplicationEvent(data),
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};
