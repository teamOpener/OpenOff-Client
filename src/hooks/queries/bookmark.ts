import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getBookmarkEventLists, updateBookmarkEvent } from 'apis/bookmark';
import queryKeys from 'constants/queries/queryKeys';
import { ApiErrorResponse } from 'types/ApiResponse';

export const useBookmarkEventLists = () => {
  return useInfiniteQuery(
    [...queryKeys.bookmarkKeys.list],
    ({ pageParam = undefined }) => getBookmarkEventLists(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const lastIdx = lastPage.data?.content.length;
        if (!lastPage.data?.hasNext) {
          return undefined;
        }
        return lastPage.data?.content[lastIdx - 1].bookmarkId;
      },
      suspense: false,
    },
  );
};

export const useBookmark = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    (eventInfoId: number) => updateBookmarkEvent(eventInfoId),
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};
