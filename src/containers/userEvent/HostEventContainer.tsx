import Spacing from 'components/common/Spacing/Spacing';
import EmptyLayout from 'components/layout/EmptyLayout/EmptyLayout';
import TicketList from 'components/userEvent/participant/TicketList/TicketList';
import resetQueryKeys from 'constants/queries/resetQueryKey';
import { UserEventTabItem } from 'constants/userEvent/participant/participantConstants';
import useDialog from 'hooks/app/useDialog';
import usePullToRefresh from 'hooks/app/usePullToRefresh';
import useNavigator from 'hooks/navigator/useNavigator';
import { useHostEventLists } from 'hooks/queries/ledger';
import useResetQueries from 'hooks/queries/useResetQueries';
import i18n from 'locales';
import { HostEventInfoResponseDto } from 'models/ledger/response/HostEventInfoResponseDto';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import userEventScreenStyles from 'screens/userEvent/UserEventScreen/UserEventScreen.style';
import { Field } from 'types/interest';

interface Props {
  activeTabName: UserEventTabItem;
  activeField?: Field;
}

const HostEventContainer = ({ activeTabName, activeField }: Props) => {
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

  const { openDialog } = useDialog();

  const { stackNavigation } = useNavigator();

  const { resetQueries } = useResetQueries();

  const refreshData = () =>
    resetQueries(resetQueryKeys.refreshHostEventList(activeField?.value));

  const { refreshing, onRefresh } = usePullToRefresh({ callback: refreshData });

  const ticketLoading = () => (
    <View style={userEventScreenStyles.loadingContainer}>
      <ActivityIndicator />
    </View>
  );

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

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemSeparatorComponent = () => <Spacing height={15} />;

  return (
    <View>
      {flatHostEventList?.length === 0 ? (
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
            onEndReached={() => fetchNextPageHostTicket()}
            ListFooterComponent={
              hasHostTicketNextPage || isHostTicketLoading
                ? ticketLoading
                : null
            }
          />
        </View>
      )}
    </View>
  );
};

export default HostEventContainer;
