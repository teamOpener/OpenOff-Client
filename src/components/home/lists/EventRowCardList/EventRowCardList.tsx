import { InfiniteData } from '@tanstack/react-query';
import EmptyScreen from 'components/common/EmptyScreen/EmptyScreen';
import EventRowCard from 'components/home/cards/EventRowCard/EventRowCard';
import EventRowCardSkeleton from 'components/suspense/skeleton/EventRowCardSkeleton/EventRowCardSkeleton';
import useNavigator from 'hooks/navigator/useNavigator';
import { FlatList, View } from 'react-native';
import { InfiniteScrollApiResponse } from 'types/ApiResponse';
import { Event } from 'types/event';
import eventRowCardListStyles from './EventRowCardList.style';

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
  const { stackNavigation } = useNavigator();

  const flatEventRowList = pageData?.pages.flatMap((page) => page.data.content);

  const isHasNextSkeleton = hasNextPage && isFetching;

  const handleEventPress = (eventId: number) => {
    stackNavigation.navigate('EventDetail', {
      id: eventId,
    });
  };

  return (
    <View style={eventRowCardListStyles.container}>
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
              event={event.item}
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

export default EventRowCardList;
