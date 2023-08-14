import fetcher from 'apis';
import { MyBookmarkEventResponseDto } from 'models/event/response/MyBookmarkEventResponseDto';
import { ApiResponse, InfiniteScrollApiResponse } from 'types/ApiResponse';

export const getBookmarkEventLists = async (
  bookmarkId: number,
): Promise<InfiniteScrollApiResponse<MyBookmarkEventResponseDto>> => {
  const params = {
    bookmarkId,
  };
  const response = await fetcher.get(`/bookmark`, { params });
  return response.data;
};

export const updateBookmarkEvent = async (
  eventInfoId: number,
): Promise<ApiResponse> => {
  const response = await fetcher.post(`/bookmark/${eventInfoId}`);
  return response.data;
};
