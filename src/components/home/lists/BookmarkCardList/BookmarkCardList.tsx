import { InfiniteData } from '@tanstack/react-query';
import EmptyScreen from 'components/common/EmptyScreen/EmptyScreen';
import EventRowCard from 'components/home/cards/EventRowCard/EventRowCard';
import EventRowCardSkeleton from 'components/suspense/skeleton/EventRowCardSkeleton/EventRowCardSkeleton';
import useNavigator from 'hooks/navigator/useNavigator';
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
  const { stackNavigation } = useNavigator();

  const flatEventRowList = pageData?.pages.flatMap((page) => page.data.content);

  const isHasNextSkeleton =
    hasNextPage && flatEventRowList?.length !== 0 && isFetching;

  const handleEventPress = (eventId: number) => {
    stackNavigation.navigate('EventDetail', {
      id: eventId,
    });
  };

  return (
    <View style={bookmarkCardListStyles.container}>
      {flatEventRowList?.length === 0 ? (
        <EmptyScreen content="이런! 아직 이벤트가 존재하지 않아요!" />
      ) : (
        <FlatList
          numColumns={1}
          data={flatEventRowList}
          renderItem={(event) => (
            <EventRowCard
              key={`eventCard-${event.index}`}
              handleEventPress={handleEventPress}
              event={{
                eventInfoId: event.item.eventInfoId,
                eventTitle: event.item.eventTitle,
                streetRoadAddress: event.item.streetRoadAddress,
                totalApplicantCount: event.item.totalApplicantCount,
                isBookmarked: true,
                fieldTypes: event.item.fieldTypeList,
                mainImageUrl: event.item.eventMainImageUrl,
                eventDate: event.item.eventDateList[0],
              }}
            />
          )}
          ListFooterComponent={
            isHasNextSkeleton || isLoading ? (
              <>
                {new Array(6).fill(1).map((_, _idx) => (
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
