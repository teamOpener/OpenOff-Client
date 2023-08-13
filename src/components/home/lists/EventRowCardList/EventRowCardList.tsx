import { InfiniteData } from '@tanstack/react-query';
import EventRowCard from 'components/home/cards/EventRowCard/EventRowCard';
import EventRowCardSkeleton from 'components/suspense/skeleton/EventRowCardSkeleton/EventRowCardSkeleton';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { InfiniteScrollApiResponse } from 'types/ApiResponse';
import { Event } from 'types/event';

interface Props {
  pageData?: InfiniteData<InfiniteScrollApiResponse<Event>>;
  isFetching: boolean;
  isLoading: boolean;
  hasNextPage?: boolean;
  handleEndReached: () => void;
}

const EventRowCardList = ({
  pageData,
  isFetching,
  isLoading,
  hasNextPage,
  handleEndReached,
}: Props) => {
  const flatEventRowList = pageData?.pages.flatMap((page) => page.data.content);

  const isHasNextSkeleton =
    hasNextPage && flatEventRowList?.length !== 0 && isFetching;

  return (
    <FlatList
      numColumns={1}
      data={flatEventRowList}
      renderItem={(event) => (
        <EventRowCard key={`eventCard-${event.index}`} event={event.item} />
      )}
      ListFooterComponent={
        isHasNextSkeleton || isLoading ? (
          <>
            {new Array(6).fill(1).map((_, _idx) => (
              <EventRowCardSkeleton key={_idx} />
            ))}
          </>
        ) : undefined
      }
      onEndReachedThreshold={0.5}
      onEndReached={handleEndReached}
    />
  );
};

export default EventRowCardList;
