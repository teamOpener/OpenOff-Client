/* eslint-disable import/prefer-default-export */
import fetcher from 'apis';
import { MyBookmarkEventResponseDto } from 'models/event/response/MyBookmarkEventResponseDto';
import { InfiniteScrollApiResponse } from 'types/ApiResponse';

export const getBookmarkEventLists = async (
  bookmarkId: number,
): Promise<InfiniteScrollApiResponse<MyBookmarkEventResponseDto>> => {
  const params = {
    bookmarkId,
  };
  const response = await fetcher.get(`/bookmark`, { params });
  return response.data;
};
