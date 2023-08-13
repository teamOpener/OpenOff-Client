/* eslint-disable import/prefer-default-export */
import { useInfiniteQuery } from '@tanstack/react-query';
import { getBookmarkEventLists } from 'apis/bookmark';
import queryKeys from 'constants/queryKeys';

export const useBookmarkEventLists = () => {
  return useInfiniteQuery(
    [...queryKeys.bookmarkKeys.list],
    ({ pageParam = undefined }) => getBookmarkEventLists(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const lastIdx = lastPage.data?.content.length;
        if (!lastPage.data?.hasNext) {
          return false;
        }
        return lastPage.data?.content[lastIdx - 1].bookmarkId;
      },
      suspense: false,
    },
  );
};
