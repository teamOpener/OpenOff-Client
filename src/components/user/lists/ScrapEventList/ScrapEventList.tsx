import { InfiniteData } from '@tanstack/react-query';
import EmptyScreen from 'components/common/EmptyScreen/EmptyScreen';
import EventCard from 'components/home/cards/EventCard/EventCard';
import EventCardSkeleton from 'components/suspense/skeleton/EventCardSkeleton/EventCardSkeleton';
import useBookmarkEvent from 'hooks/bookmark/useBookmarkEvent';
import { MyBookmarkEventResponseDto } from 'models/event/response/MyBookmarkEventResponseDto';
import { FlatList, View } from 'react-native';
import { InfiniteScrollApiResponse } from 'types/ApiResponse';
import scrapEventListStyles from './ScrapEventList.style';

interface Props {
  pageData?: InfiniteData<
    InfiniteScrollApiResponse<MyBookmarkEventResponseDto>
  >;
  isFetching: boolean;
  isLoading: boolean;
  hasNextPage?: boolean;
  handleEndReached: () => void;
}

const ScrapEventList = ({
  pageData,
  isFetching,
  isLoading,
  hasNextPage,
  handleEndReached,
}: Props) => {
  const { flatEventList, handleEventPress, formattedEvent, isHasNextSkeleton } =
    useBookmarkEvent(isFetching, pageData, hasNextPage);

  return (
    <View style={scrapEventListStyles.container}>
      {flatEventList?.length === 0 ? (
        <EmptyScreen content="이런! 아직 이벤트가 존재하지 않아요!" />
      ) : (
        <FlatList
          nestedScrollEnabled
          numColumns={2}
          data={flatEventList}
          columnWrapperStyle={scrapEventListStyles.rowGap}
          renderItem={(event) => (
            <EventCard
              key={event.index}
              type="scrap"
              event={formattedEvent(event.item)}
              handlePress={handleEventPress}
            />
          )}
          ListFooterComponent={
            isHasNextSkeleton || isLoading ? (
              <>
                {new Array(3).fill(1).map((_, _idx) => (
                  <EventCardSkeleton key={`eventCard-skeleton-${_idx}`} />
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

export default ScrapEventList;
