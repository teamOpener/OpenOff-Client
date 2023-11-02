import Spacing from 'components/common/Spacing/Spacing';
import EmptyLayout from 'components/layout/EmptyLayout/EmptyLayout';
import TicketList from 'components/userEvent/participant/TicketList/TicketList';
import resetQueryKeys from 'constants/queries/resetQueryKey';
import { UserEventTabItem } from 'constants/userEvent/participant/participantConstants';
import usePullToRefresh from 'hooks/app/usePullToRefresh';
import useNavigator from 'hooks/navigator/useNavigator';
import { useUserTicketLists } from 'hooks/queries/ledger';
import useResetQueries from 'hooks/queries/useResetQueries';
import i18n from 'locales';
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

const ParticipationEventContainer = ({ activeTabName, activeField }: Props) => {
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

  const { stackNavigation } = useNavigator();

  const flatUserTicketList = ticketLists?.pages.flatMap(
    (page) => page.data.content,
  );

  const { resetQueries } = useResetQueries();

  const { refreshing, onRefresh } = usePullToRefresh({
    callback: () =>
      resetQueries(resetQueryKeys.refreshUserEventList(activeField?.value)),
  });

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemSeparatorComponent = () => <Spacing height={15} />;

  const ticketLoading = () => (
    <View style={userEventScreenStyles.loadingContainer}>
      <ActivityIndicator />
    </View>
  );

  const handlePressTicket = (eventInfoId: number) => {
    stackNavigation.navigate('UserTicket', {
      eventId: eventInfoId,
    });
  };

  return (
    <View style={userEventScreenStyles.flexContainer}>
      {flatUserTicketList?.length === 0 ? (
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
            onEndReached={() => {
              if (hasUserTicketNextPage && !isUserTicketLoading) {
                fetchNextPageUserTicket();
              }
            }}
            ListFooterComponent={
              hasUserTicketNextPage || isUserTicketLoading ? (
                ticketLoading
              ) : (
                <Spacing height={200} />
              )
            }
          />
        </View>
      )}
    </View>
  );
};

export default ParticipationEventContainer;
