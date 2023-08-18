import fetcher from 'apis';
import { ApiResponse, InfiniteScrollApiResponse } from 'types/ApiResponse';
import { EventLadgerTotalStatusRequestDto } from 'models/ledger/request/EventLadgerTotalStatusRequestDto';
import { EventLadgerTotalStatusResponseDto } from 'models/ledger/response/EventLadgerTotalStatusResponseDto';
import { EventApplicantInfoRequestDto } from 'models/ledger/request/EventApplicantInfoRequestDto';
import { EventApplicantInfoResponseDto } from 'models/ledger/response/EventApplicantInfoResponseDto';
import { EventApplicantPermitRequestDto } from 'models/ledger/request/EventApplicantPermitRequestDto';
import { EventAllApplicantPermitRequestDto } from 'models/ledger/request/EventAllApplicantPermitRequestDto';
import { ApplyEventRequestDto } from 'models/ledger/request/ApplyEventRequestDto';

export const getLedgerStatus = async (
  params: EventLadgerTotalStatusRequestDto,
): Promise<ApiResponse<EventLadgerTotalStatusResponseDto>> => {
  const response = await fetcher.get(`/ladger/status`, { params });
  return response.data;
};

export const getLedgerUserList = async (
  params: EventApplicantInfoRequestDto,
): Promise<InfiniteScrollApiResponse<EventApplicantInfoResponseDto>> => {
  const response = await fetcher.get(`/ladger/user`, { params });
  return response.data;
};

export const permitApplicant = async (
  data: EventApplicantPermitRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.patch(
    `/ladger/permit?ladgerId=${data.ladgerId}`,
  );
  return response.data;
};

export const cancelPermittedApplicant = async (
  data: EventApplicantPermitRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.patch(
    `/ladger/permit/cancel?ladgerId=${data.ladgerId}`,
  );
  return response.data;
};

export const permitAllApplicant = async (
  data: EventAllApplicantPermitRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.patch(
    `/ladger/permit/all?eventIndexId=${data.eventIndexId}`,
  );
  return response.data;
};

export const applyEvent = async (
  data: ApplyEventRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.post(`/ladger/apply`, data);
  return response.data;
};
