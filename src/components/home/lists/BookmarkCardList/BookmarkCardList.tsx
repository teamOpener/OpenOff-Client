import { InfiniteData } from '@tanstack/react-query';
import EmptyScreen from 'components/common/EmptyScreen/EmptyScreen';
import EventRowCard from 'components/home/cards/EventRowCard/EventRowCard';
import EventRowCardSkeleton from 'components/suspense/skeleton/EventRowCardSkeleton/EventRowCardSkeleton';
import useBookmarkEvent from 'hooks/bookmark/useBookmarkEvent';
import { MyBookmarkEventResponseDto } from 'models/event/response/MyBookmarkEventResponseDto';
import { FlatList, View } from 'react-native';
import { InfiniteScrollApiResponse } from 'types/ApiResponse';
import bookmarkCardListStyles from './BookmarkCardList.style';

interface Props {
  pageData?: InfiniteData<
    InfiniteScrollApiResponse<MyBookmarkEventResponseDto>
  >;
  isFetching: boolean;
  isLoading: boolean;
  hasNextPage?: boolean;
  handleEndReached: () => void;
}

const BookmarkCardList = ({
  pageData,
  isFetching,
  isLoading,
  hasNextPage,
  handleEndReached,
}: Props) => {
  const { flatEventList, handleEventPress, formattedEvent, isHasNextSkeleton } =
    useBookmarkEvent(isFetching, pageData, hasNextPage);

  return (
    <View style={bookmarkCardListStyles.container}>
      {flatEventList?.length === 0 ? (
        <EmptyScreen content="이런! 아직 이벤트가 존재하지 않아요!" />
      ) : (
        <FlatList
          numColumns={1}
          style={bookmarkCardListStyles.flatListcontainer}
          data={flatEventList}
          renderItem={(event) => (
            <EventRowCard
              key={`eventCard-${event.index}`}
              handleEventPress={handleEventPress}
              event={formattedEvent(event.item)}
              type="bookmark"
            />
          )}
          ListFooterComponent={
            isHasNextSkeleton || isLoading ? (
              <>
                {new Array(3).fill(1).map((_, _idx) => (
                  <EventRowCardSkeleton key={`eventCard-skeleton-${_idx}`} />
                ))}
              </>
            ) : undefined
          }
          onEndReachedThreshold={0.5}
          onEndReached={handleEndReached}
        />
      )}
    </View>
  );
};

export default BookmarkCardList;
