import fetcher from 'apis';
import { CreateNewEventRequestDto } from 'models/event/request/CreateNewEventRequestDto';
import EventFieldListRequestDto from 'models/event/request/EventFieldListRequestDto';
import EventSearchRequestDto from 'models/event/request/EventSearchRequestDto';
import EventVogueListRequestDto from 'models/event/request/EventVogueListRequestDto';
import { DetailEventInfoResponseDto } from 'models/event/response/DetailEventInfoResponseDto';
import MainTapEventInfoResponseDto from 'models/event/response/MainTapEventInfoResponseDto';
import SearchMapEventInfoResponseDto from 'models/event/response/SearchMapEventInfoResponseDto';
import { HostEventInfoRequestDto } from 'models/ledger/request/HostEventInfoRequestDto';
import { HostEventInfoResponseDto } from 'models/ledger/response/HostEventInfoResponseDto';
import Qs from 'qs';
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

export const getPersonalEventLists = async (): Promise<
  ApiResponse<MainTapEventInfoResponseDto[]>
> => {
  const response = await fetcher.get(`/event-instance/main/personal`);
  return response.data;
};

export const getVogueEventLists = async (
  params?: EventVogueListRequestDto,
): Promise<InfiniteScrollApiResponse<MainTapEventInfoResponseDto>> => {
  const response = await fetcher.get(`/event-instance/main/vogue`, { params });
  return response.data;
};

export const getFieldEventLists = async (
  eventParams: EventFieldListRequestDto,
): Promise<InfiniteScrollApiResponse<MainTapEventInfoResponseDto>> => {
  const params = {
    eventInfoId: eventParams.eventInfoId,
  };
  const response = await fetcher.get(
    `/event-instance/main/${eventParams.field}`,
    {
      params,
    },
  );
  return response.data;
};

export const createEvent = async (
  data: CreateNewEventRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.post(`/event-instance/create`, data);
  return response.data;
};

export const getEventMapInstance = async (
  params: EventSearchRequestDto,
): Promise<ApiResponse<SearchMapEventInfoResponseDto[]>> => {
  const response = await fetcher.get(`/event-instance/search`, {
    params,
    paramsSerializer: (queryParams) => {
      return Qs.stringify(queryParams, { skipNulls: true });
    },
  });
  return response.data;
};
