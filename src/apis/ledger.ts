import fetcher from 'apis';
import { ApiResponse, InfiniteScrollApiResponse } from 'types/ApiResponse';
import { EventLadgerTotalStatusRequestDto } from 'models/ledger/request/EventLadgerTotalStatusRequestDto';
import { EventLadgerTotalStatusResponseDto } from 'models/ledger/response/EventLadgerTotalStatusResponseDto';
import { EventApplicantInfoRequestDto } from 'models/ledger/request/EventApplicantInfoRequestDto';
import { EventApplicantInfoResponseDto } from 'models/ledger/response/EventApplicantInfoResponseDto';
import { EventApplicantPermitRequestDto } from 'models/ledger/request/EventApplicantPermitRequestDto';
import { EventAllApplicantPermitRequestDto } from 'models/ledger/request/EventAllApplicantPermitRequestDto';
import { ApplyEventRequestDto } from 'models/ledger/request/ApplyEventRequestDto';
import { EventApplicationDenyRequestDto } from 'models/ledger/request/EventApplicationDenyRequestDto';
import { ApplicantApplyDetailResponseDto } from 'models/ledger/response/ApplicantApplyDetailResponseDto';
import { ApplicantApplyDetailRequestDto } from 'models/ledger/request/ApplicantApplyDetailRequestDto';
import { ApplicationInfoRequestDto } from 'models/ledger/request/ApplicationInfoRequestDto';
import { ApplicationInfoResponseDto } from 'models/ledger/response/ApplicationInfoResponseDto';
import { MyTicketInfoRequestDto } from 'models/ledger/request/MyTicketInfoRequestDto';
import { MyTicketInfoResponseDto } from 'models/ledger/response/MyTicketInfoResponseDto';
import { QRCheckResponseDto } from 'models/ledger/response/QRCheckResponseDto';
import { QRCheckRequestDto } from 'models/ledger/request/QRCheckRequestDto';
import { ApplicationCancelRequestDto } from 'models/ledger/request/ApplicationCancelRequestDto';
import { EventStaffInfoResponseDto } from 'models/ledger/response/EventStaffInfoResponseDto';
import { StaffMinusRequestDto } from 'models/ledger/request/StaffMinusRequestDto';
import { EventStaffCreateRequestDto } from 'models/ledger/request/EventStaffCreateRequestDto';
import { EventStaffInfoRequestDto } from 'models/ledger/request/EventStaffInfoRequestDto';

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

export const denyApplicationUser = async (
  data: EventApplicationDenyRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.delete(
    `/ladger/reject/${data.ledgerId}?rejectReason=${data.rejectReason}`,
  );
  return response.data;
};

export const getApplicantQnA = async (
  data: ApplicantApplyDetailRequestDto,
): Promise<ApiResponse<ApplicantApplyDetailResponseDto>> => {
  const response = await fetcher.get(
    `/ladger/application/info/${data.ledgerId}`,
  );
  return response.data;
};

export const getApplicationInfo = async (
  params: ApplicationInfoRequestDto,
): Promise<InfiniteScrollApiResponse<ApplicationInfoResponseDto>> => {
  const response = await fetcher.get(`/ladger/tickets`, { params });
  return response.data;
};

export const getEventTickets = async (
  params: MyTicketInfoRequestDto,
): Promise<ApiResponse<MyTicketInfoResponseDto[]>> => {
  const response = await fetcher.get(`/ladger/tickets/${params.eventInfoId}`);
  return response.data;
};

export const checkQR = async (
  data: QRCheckRequestDto,
): Promise<ApiResponse<QRCheckResponseDto>> => {
  const response = await fetcher.patch(`/ladger/qr/check`, data);
  return response.data;
};

export const cancelApplicationEvent = async (
  params: ApplicationCancelRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.delete(
    `/ladger/own/cancel/${params.ledgerId}`,
  );
  return response.data;
};

export const getStaffs = async (
  params: EventStaffInfoRequestDto,
): Promise<ApiResponse<EventStaffInfoResponseDto[]>> => {
  const response = await fetcher.get(`/staff/list`, { params });
  return response.data;
};

export const minusStaff = async (
  params: StaffMinusRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.delete(`/staff/minus`, { params });
  return response.data;
};

export const plusStaff = async (
  data: EventStaffCreateRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.post(`/staff/plus`, data);
  return response.data;
};
