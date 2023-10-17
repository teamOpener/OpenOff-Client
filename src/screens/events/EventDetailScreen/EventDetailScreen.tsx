import i18n from 'locales';
import { useQueryClient } from '@tanstack/react-query';
import FixedButton from 'components/common/FixedButton/FixedButton';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import { EventDetail } from 'components/eventDetail';
import EventEmptyLayout from 'components/eventDetail/layout/EventEmtpyLayout';
import BookmarkButton from 'components/home/buttons/BookmarkButton/BookmarkButton';
import KeyboardAvoidingScreenLayout from 'components/layout/KeyboardAvoidingScreenLayout/KeyboardAvoidingScreenLayout';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { StackMenu } from 'constants/app/menu';
import { EventDetailTabItem } from 'constants/eventDetail/eventDetailConstants';
import queryKeys from 'constants/queries/queryKeys';
import dayjs from 'dayjs';
import usePullToRefresh from 'hooks/app/usePullToRefresh';
import useEventApplyStatus from 'hooks/event/useEventApplyStatus';
import useEventIndexList from 'hooks/event/useEventIndexList';
import useNavigator from 'hooks/navigator/useNavigator';
import useStackRoute from 'hooks/navigator/useStackRoute';
import { useEventDetail } from 'hooks/queries/event';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import eventDetailScreenStyles from './EventDetailScreen.style';

const EventDetailScreen = () => {
  const queryClient = useQueryClient();
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

  const refreshData = () => {
    queryClient.invalidateQueries(queryKeys.eventKeys.byId(params.id));
  };

  const { refreshing, onRefresh } = usePullToRefresh({ callback: refreshData });

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

  return (
    <KeyboardAvoidingScreenLayout>
      {!event && <EventEmptyLayout />}

      {event && (
        <>
          <ScrollView
            style={eventDetailScreenStyles.full}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() => setIsScrolling(true)}
            onScrollEndDrag={() => setIsScrolling(false)}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <EventDetail.TitleText title={event.title} />

            <SpaceLayout size={10}>
              <EventDetail.SmallSimpleList
                title={i18n.t('event_detail.address')}
                description={`${event.streetLoadAddress} ${event.detailAddress}`}
                // TODO
                // action={
                //   <EventDetail.TextButton
                //     label={MENT_EVENT_DETAIL.MAIN.LOCATION}
                //     onPress={handleLocation}
                //   />
                // }
              />
              <EventDetail.SmallSimpleList
                title={i18n.t('cost')}
                description={`${i18n.t(
                  'event_detail.admission_fees',
                )} ${event.eventFee.toLocaleString()}${i18n.t(
                  'event_detail.won',
                )}`}
              />
              <EventDetail.SmallSimpleList
                title={i18n.t('event_detail.application_date')}
                description={`${dayjs(event.eventApplyStartDate).format(
                  'YYYY.MM.DD HH:mm',
                )} - ${dayjs(event.eventApplyEndDate).format(
                  'YYYY.MM.DD HH:mm',
                )}`}
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
                label={i18n.t('event_detail.introduction_event')}
                isActive={activeTabName === EventDetailTabItem.DESCRIPTION}
                onPress={() => handleTab(EventDetailTabItem.DESCRIPTION)}
              />
              <EventDetail.TabItem
                label={i18n.t('event_detail.comments')}
                isActive={activeTabName === EventDetailTabItem.COMMENTS}
                onPress={() => handleTab(EventDetailTabItem.COMMENTS)}
              />
            </EventDetail.Tab>
            <Spacing height={30} />

            {activeTabName === EventDetailTabItem.DESCRIPTION ? (
              <View style={eventDetailScreenStyles.descriptionWrapper}>
                <Text variant="body2">{event.description}</Text>
              </View>
            ) : (
              <EventDetail.CommentList
                eventInfoId={event.eventId}
                isScrolling={isScrolling}
              />
            )}

            <Spacing height={80} />
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
        </>
      )}
    </KeyboardAvoidingScreenLayout>
  );
};

export default EventDetailScreen;
