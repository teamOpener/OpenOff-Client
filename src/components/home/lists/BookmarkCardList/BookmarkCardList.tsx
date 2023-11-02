import i18n from 'locales';
import { InfiniteData } from '@tanstack/react-query';
import EmptyScreen from 'components/common/EmptyScreen/EmptyScreen';
import EventCard from 'components/home/cards/EventCard/EventCard';
import EventCardSkeleton from 'components/suspense/skeleton/EventCardSkeleton/EventCardSkeleton';
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
        <EmptyScreen content={i18n.t('empty_event')} />
      ) : (
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          style={bookmarkCardListStyles.flatListcontainer}
          data={flatEventList}
          columnWrapperStyle={bookmarkCardListStyles.rowGap}
          renderItem={(event) => (
            <EventCard
              key={event.index}
              type="bookmark"
              event={formattedEvent(event.item)}
              handlePress={handleEventPress}
            />
          )}
          ListFooterComponent={
            isHasNextSkeleton || isLoading ? (
              <View style={bookmarkCardListStyles.skeletonContainer}>
                {new Array(4).fill(1).map((_, _idx) => (
                  <EventCardSkeleton
                    // eslint-disable-next-line react/no-array-index-key
                    key={`eventCard-skeleton-${_idx}`}
                    type="scrap"
                  />
                ))}
              </View>
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
