import i18n from 'locales';
import Spacing from 'components/common/Spacing/Spacing';
import EmptyLayout from 'components/layout/EmptyLayout/EmptyLayout';
import {
  CategorySelector,
  Tab,
  TabItem,
  TicketList,
} from 'components/userEvent/participant';
import { BottomTabMenu } from 'constants/app/menu';
import resetQueryKeys from 'constants/queries/resetQueryKey';
import { UserEventTabItem } from 'constants/userEvent/participant/participantConstants';
import useDialog from 'hooks/app/useDialog';
import usePullToRefresh from 'hooks/app/usePullToRefresh';
import useInterestFields from 'hooks/interest/useInterestFields';
import useNavigator from 'hooks/navigator/useNavigator';
import useTabRoute from 'hooks/navigator/useTabRoute';
import { useHostEventLists, useUserTicketLists } from 'hooks/queries/ledger';
import useResetQueries from 'hooks/queries/useResetQueries';
import { HostEventInfoResponseDto } from 'models/ledger/response/HostEventInfoResponseDto';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { Field } from 'types/interest';
import userEventScreenStyles from './UserEventScreen.style';

const UserEventScreen = () => {
  const { params } = useTabRoute<BottomTabMenu.UserEvent>();
  const { stackNavigation } = useNavigator();
  const { openDialog } = useDialog();

  const [activeTabName, setActiveTabName] = useState<UserEventTabItem>(
    UserEventTabItem.PARTICIPANT,
  );

  const { generateInterestFieldTags } = useInterestFields();

  const [field, setField] = useState<Field[]>(generateInterestFieldTags());
  const activeField = field.find((fieldData) => fieldData.isActive);

  // TODO: 무한스크롤 test 필요
  const {
    data: ticketLists,
    isLoading: isUserTicketLoading,
    hasNextPage: hasUserTicketNextPage,
    fetchNextPage: fetchNextPageUserTicket,
  } = useUserTicketLists(
    activeTabName === UserEventTabItem.PARTICIPANT
      ? activeField?.value
      : undefined,
  );

  const flatUserTicketList = ticketLists?.pages.flatMap(
    (page) => page.data.content,
  );

  const {
    data: hostEventList,
    isLoading: isHostTicketLoading,
    hasNextPage: hasHostTicketNextPage,
    fetchNextPage: fetchNextPageHostTicket,
  } = useHostEventLists(
    activeTabName === UserEventTabItem.HOST ? activeField?.value : undefined,
  );

  const flatHostEventList = hostEventList?.pages.flatMap(
    (page) => page.data.content,
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemSeparatorComponent = () => <Spacing height={15} />;

  const onEndReached = () => {
    if (activeTabName === UserEventTabItem.HOST && hasHostTicketNextPage) {
      fetchNextPageHostTicket();
      return;
    }
    if (
      activeTabName === UserEventTabItem.PARTICIPANT &&
      hasUserTicketNextPage
    ) {
      fetchNextPageUserTicket();
    }
  };

  const handleTab = (name: UserEventTabItem) => {
    setActiveTabName(name);
  };

  const handlePressTicket = (eventInfoId: number) => {
    stackNavigation.navigate('UserTicket', {
      eventId: eventInfoId,
    });
  };

  const handlePressHostEvent = (event: HostEventInfoResponseDto) => {
    if (!event.isApproved) {
      openDialog({
        type: 'validate',
        text: i18n.t('not_approved_event'),
      });
      return;
    }
    stackNavigation.navigate('HostConsole', { eventId: event.eventInfoId });
  };

  const { resetQueries } = useResetQueries();

  const refreshData = () => {
    if (activeTabName === UserEventTabItem.PARTICIPANT) {
      resetQueries(resetQueryKeys.refreshUserEventList(activeField?.value));
    } else {
      resetQueries(resetQueryKeys.refreshHostEventList(activeField?.value));
    }
  };

  const { refreshing, onRefresh } = usePullToRefresh({ callback: refreshData });

  const ticketLoading = () => (
    <View style={userEventScreenStyles.loadingContainer}>
      <ActivityIndicator />
    </View>
  );

  useEffect(() => {
    if (params && params.tab) {
      setActiveTabName(params.tab);
    }
  }, [params]);

  return (
    <View style={userEventScreenStyles.container}>
      <Tab>
        <TabItem
          label={i18n.t('participation_event')}
          isActive={activeTabName === UserEventTabItem.PARTICIPANT}
          onPress={() => handleTab(UserEventTabItem.PARTICIPANT)}
        />
        <TabItem
          label={i18n.t('hosted_event')}
          isActive={activeTabName === UserEventTabItem.HOST}
          onPress={() => handleTab(UserEventTabItem.HOST)}
        />
      </Tab>

      <Spacing height={13} />

      <CategorySelector field={field} setField={setField} />

      <Spacing height={9} />

      {/* 참여 이벤트 */}
      {activeTabName === UserEventTabItem.PARTICIPANT &&
        (flatUserTicketList?.length === 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <EmptyLayout helpText={i18n.t('empty_tickets')} />
          </ScrollView>
        ) : (
          <View style={userEventScreenStyles.scrollContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={flatUserTicketList}
              contentContainerStyle={userEventScreenStyles.flatListContentStyle}
              ItemSeparatorComponent={ItemSeparatorComponent}
              renderItem={({ item }) => (
                <TicketList
                  key={item.eventInfoId}
                  eventTitle={item.eventTitle}
                  eventDateList={item.eventDateList}
                  fieldTypeList={item.fieldTypeList}
                  onPress={() => handlePressTicket(item.eventInfoId)}
                />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              onEndReachedThreshold={0.5}
              onEndReached={onEndReached}
              ListFooterComponent={
                hasUserTicketNextPage || isUserTicketLoading
                  ? ticketLoading
                  : null
              }
            />
          </View>
        ))}

      {/* 주최 이벤트 */}
      {activeTabName === UserEventTabItem.HOST &&
        (flatHostEventList?.length === 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <EmptyLayout helpText={i18n.t('empty_host_event')} />
          </ScrollView>
        ) : (
          <View style={userEventScreenStyles.scrollContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={flatHostEventList}
              contentContainerStyle={userEventScreenStyles.flatListContentStyle}
              ItemSeparatorComponent={ItemSeparatorComponent}
              renderItem={({ item }) => (
                <TicketList
                  key={item.eventInfoId}
                  eventTitle={item.eventTitle}
                  eventDateList={item.eventIndexInfoList.map(
                    (eventIndexInfo) => eventIndexInfo.eventDate,
                  )}
                  fieldTypeList={item.fieldTypeList}
                  onPress={() => handlePressHostEvent(item)}
                />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              onEndReachedThreshold={0.5}
              onEndReached={onEndReached}
              ListFooterComponent={
                hasHostTicketNextPage || isHostTicketLoading
                  ? ticketLoading
                  : null
              }
            />
          </View>
        ))}
    </View>
  );
};

export default UserEventScreen;
