import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useEventDetail } from 'hooks/queries/event';
import useStackRoute from 'hooks/navigator/useStackRoute';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { EventDetail, EventDetailScreenLayout } from 'components/eventDetail';
import MENT_EVENT_DETAIL from 'constants/eventDetail/eventDetailMessage';
import Spacing from 'components/common/Spacing/Spacing';
import FixedButton from 'components/common/FixedButton/FixedButton';
import BookmarkButton from 'components/home/buttons/BookmarkButton/BookmarkButton';
import { ScrollView, View } from 'react-native';
import useNavigator from 'hooks/navigator/useNavigator';
import useEventIndexList from 'hooks/event/useEventIndexList';
import useEventApplyStatus from 'hooks/event/useEventApplyStatus';
import Text from 'components/common/Text/Text';
import { EventDetailTabItem } from 'constants/eventDetail/eventDetailConstants';
import { StackMenu } from 'constants/menu';
import eventDetailScreenStyles from './EventDetailScreen.style';

const EventDetailScreen = () => {
  const { params } = useStackRoute<StackMenu.EventDetail>();
  const { stackNavigation } = useNavigator();

  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const { data: event } = useEventDetail(params.id);
  const { sortEventsByEventDate } = useEventIndexList({
    eventIndexList: event?.indexList,
  });

  const [activeTabName, setActiveTabName] = useState<EventDetailTabItem>(
    EventDetailTabItem.DESCRIPTION,
  );

  const handleTab = (name: EventDetailTabItem) => {
    setActiveTabName(name);
  };

  const handleLocation = () => {
    // TODO 지도로 해당 이벤트 ?? 가지고 이동
  };

  const { disabledEvent } = useEventApplyStatus();

  const handleApply = () => {
    // TODO: 얼마 안남았을 경우 timer 걸기
    if (!event) {
      return;
    }

    if (disabledEvent(event).disabled) {
      return;
    }

    stackNavigation.navigate('EventSelect', {
      id: params.id,
    });
  };

  const headerRight = () => (
    <View style={eventDetailScreenStyles.bookmarkButtonWrapper}>
      <BookmarkButton
        isEventBookmarked={event?.isBookmarked ?? false}
        eventInfoId={params.id}
      />
    </View>
  );

  useEffect(() => {
    if (params.tab) {
      setActiveTabName(params.tab);
    } else {
      setActiveTabName(EventDetailTabItem.DESCRIPTION);
    }
  }, [params]);

  useEffect(() => {
    stackNavigation.setOptions({
      headerRight,
    });
  }, []);

  // TODO
  if (!event) {
    return null;
  }

  return (
    <EventDetailScreenLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => setIsScrolling(true)}
        onScrollEndDrag={() => setIsScrolling(false)}
      >
        <EventDetail.TitleText title={event.title} />

        <SpaceLayout size={10}>
          <EventDetail.SmallSimpleList
            title={MENT_EVENT_DETAIL.MAIN.ADDRESS}
            description={`${event.streetLoadAddress} ${event.detailAddress}`}
            action={
              <EventDetail.TextButton
                label={MENT_EVENT_DETAIL.MAIN.LOCATION}
                onPress={handleLocation}
              />
            }
          />
          <EventDetail.SmallSimpleList
            title={MENT_EVENT_DETAIL.MAIN.COST}
            description={`입장료 ${event.eventFee.toLocaleString()}${
              MENT_EVENT_DETAIL.MAIN.WON
            }`}
          />
          <EventDetail.SmallSimpleList
            title={MENT_EVENT_DETAIL.MAIN.APPLICATION_DATE}
            description={`${dayjs(event.eventApplyStartDate).format(
              'YYYY.MM.DD HH:mm',
            )} - ${dayjs(event.eventApplyEndDate).format('YYYY.MM.DD HH:mm')}`}
          />
        </SpaceLayout>
        <Spacing height={30} />

        <EventDetail.PosterCarousel images={event.imageList} />
        <Spacing height={20} />

        <EventDetail.DateCardCarousel
          indexList={sortEventsByEventDate()}
          maxCapacity={event.maxCapacity}
        />
        <Spacing height={30} />

        <EventDetail.Tab>
          <EventDetail.TabItem
            label={MENT_EVENT_DETAIL.MAIN.INTRODUCTION_EVENT}
            isActive={activeTabName === EventDetailTabItem.DESCRIPTION}
            onPress={() => handleTab(EventDetailTabItem.DESCRIPTION)}
          />
          <EventDetail.TabItem
            label={MENT_EVENT_DETAIL.MAIN.COMMENTS}
            isActive={activeTabName === EventDetailTabItem.COMMENTS}
            onPress={() => handleTab(EventDetailTabItem.COMMENTS)}
          />
        </EventDetail.Tab>
        <Spacing height={30} />

        {/* TODO: 개행 처리 어캐할지 */}
        {activeTabName === EventDetailTabItem.DESCRIPTION ? (
          <Text variant="body2">{event.description}</Text>
        ) : (
          <EventDetail.CommentList
            eventInfoId={event.eventId}
            isScrolling={isScrolling}
          />
        )}

        <Spacing height={100} />
      </ScrollView>
      {activeTabName === EventDetailTabItem.DESCRIPTION ? (
        <FixedButton
          disabled={disabledEvent(event).disabled}
          label={disabledEvent(event).label}
          onPress={handleApply}
        />
      ) : (
        <EventDetail.CommentInput eventInfoId={event.eventId} />
      )}
    </EventDetailScreenLayout>
  );
};

export default EventDetailScreen;
