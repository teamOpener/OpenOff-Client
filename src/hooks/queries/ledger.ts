import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { getHostEventLists } from 'apis/eventInstance';
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
  getStaffs,
  minusStaff,
  permitAllApplicant,
  permitApplicant,
  plusStaff,
} from 'apis/ledger';
import { FieldCode } from 'constants/interest/interest';
import queryKeys from 'constants/queries/queryKeys';
import SortType from 'models/ledger/entity/SortType';
import { ApplicantApplyDetailRequestDto } from 'models/ledger/request/ApplicantApplyDetailRequestDto';
import { ApplicationCancelRequestDto } from 'models/ledger/request/ApplicationCancelRequestDto';
import { ApplyEventRequestDto } from 'models/ledger/request/ApplyEventRequestDto';
import { EventAllApplicantPermitRequestDto } from 'models/ledger/request/EventAllApplicantPermitRequestDto';
import { EventApplicantPermitRequestDto } from 'models/ledger/request/EventApplicantPermitRequestDto';
import { EventApplicationDenyRequestDto } from 'models/ledger/request/EventApplicationDenyRequestDto';
import { EventStaffCreateRequestDto } from 'models/ledger/request/EventStaffCreateRequestDto';
import { EventStaffInfoRequestDto } from 'models/ledger/request/EventStaffInfoRequestDto';
import { MyTicketInfoRequestDto } from 'models/ledger/request/MyTicketInfoRequestDto';
import { QRCheckRequestDto } from 'models/ledger/request/QRCheckRequestDto';
import { StaffMinusRequestDto } from 'models/ledger/request/StaffMinusRequestDto';
import { QRCheckResponseDto } from 'models/ledger/response/QRCheckResponseDto';
import { ApiErrorResponse, ApiResponse } from 'types/ApiResponse';

export const useUserTickets = ({ eventInfoId }: MyTicketInfoRequestDto) => {
  return useQuery(
    [...queryKeys.participantKeys.cardById(eventInfoId)],
    () => getEventTickets({ eventInfoId }),
    { select: (data) => data.data },
  );
};

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
      suspense: false,
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
      suspense: false,
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

export const useLedgerUserList = (
  eventIndexId: number,
  sortType: SortType,
  keyword?: string,
) => {
  const query = useInfiniteQuery(
    [
      ...queryKeys.hostKeys.ledgerListByIndexId(
        eventIndexId,
        sortType,
        keyword,
      ),
    ],
    ({ pageParam = null }) => {
      return getLedgerUserList({
        eventIndexId,
        sort: sortType,
        ladgerId: pageParam ? pageParam.ladgerId : undefined,
        username: pageParam ? pageParam.username : undefined,
        time: pageParam ? pageParam.time : undefined,
        keyword,
      });
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.last) {
          return false;
        }
        const lastIdx = lastPage.data?.content.length;
        if (!lastPage.data) {
          return false;
        }

        if (sortType === SortType.DATE) {
          const { ladgerId } = lastPage.data.content[lastIdx - 1];
          return {
            ladgerId,
          };
        }

        const { username, createdAt } = lastPage.data.content[lastIdx - 1];
        return {
          username,
          time: createdAt,
        };
      },
      suspense: false,
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
  successCallback?: (data: ApiResponse<QRCheckResponseDto>) => void,
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

export const useStaffLists = ({ eventInfoId }: EventStaffInfoRequestDto) => {
  return useQuery(
    [...queryKeys.ledgerKeys.staffByEventInfoId(eventInfoId)],
    () => getStaffs({ eventInfoId }),
    {
      select: (data) => data.data,
      suspense: false,
    },
  );
};

export const usePlusStaff = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((data: EventStaffCreateRequestDto) => plusStaff(data), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
  });
};

export const useMinusStaff = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((params: StaffMinusRequestDto) => minusStaff(params), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
  });
};
