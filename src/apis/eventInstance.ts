import fetcher from 'apis';
import { DetailEventInfoResponseDto } from 'models/event/response/DetailEventInfoResponseDto';
import { HostEventInfoRequestDto } from 'models/ledger/request/HostEventInfoRequestDto';
import { HostEventInfoResponseDto } from 'models/ledger/response/HostEventInfoResponseDto';
import { ApiResponse, InfiniteScrollApiResponse } from 'types/ApiResponse';

export const getHostEventLists = async (
  params: HostEventInfoRequestDto,
): Promise<InfiniteScrollApiResponse<HostEventInfoResponseDto>> => {
  const response = await fetcher.get(`/event-instance/host`, { params });
  return response.data;
};

export const getEventDetailInfo = async (
  eventInfoId: number,
): Promise<ApiResponse<DetailEventInfoResponseDto>> => {
  const response = await fetcher.get(`/event-instance/detail/${eventInfoId}`);
  return response.data;
};
