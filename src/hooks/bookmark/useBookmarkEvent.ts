import { InfiniteData } from '@tanstack/react-query';
import useNavigator from 'hooks/navigator/useNavigator';
import { MyBookmarkEventResponseDto } from 'models/event/response/MyBookmarkEventResponseDto';
import { InfiniteScrollApiResponse } from 'types/ApiResponse';

const useBookmarkEvent = (
  isFetching: boolean,
  pageData?: InfiniteData<
    InfiniteScrollApiResponse<MyBookmarkEventResponseDto>
  >,
  hasNextPage?: boolean,
) => {
  const { stackNavigation } = useNavigator();

  const flatEventList = pageData?.pages.flatMap((page) => page.data.content);

  const isHasNextSkeleton = hasNextPage && isFetching;

  const handleEventPress = (eventId: number) => {
    stackNavigation.navigate('EventDetail', {
      id: eventId,
    });
  };

  const formattedEvent = (event: MyBookmarkEventResponseDto) => ({
    eventInfoId: event.eventInfoId,
    eventTitle: event.eventTitle,
    streetRoadAddress: event.streetRoadAddress,
    totalApplicantCount: event.totalApplicantCount,
    isBookmarked: true,
    fieldTypes: event.fieldTypeList,
    mainImageUrl: event.eventMainImageUrl,
    eventDate: event.eventDateList[0],
  });

  return {
    flatEventList,
    isHasNextSkeleton,
    handleEventPress,
    formattedEvent,
  };
};

export default useBookmarkEvent;
