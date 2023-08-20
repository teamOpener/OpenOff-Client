import { View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { HostEventInfoResponseDto } from 'models/ledger/response/HostEventInfoResponseDto';
import fieldInitData from 'constants/userEvent/participant/fieldData';
import { UserEventTabItem } from 'constants/userEvent/participant/participantConstants';
import MENT_PARTICIPANT from 'constants/userEvent/participant/participantMessage';
import { useHostEventLists, useUserTicketLists } from 'hooks/queries/ledger';
import useNavigator from 'hooks/navigator/useNavigator';
import useDialog from 'hooks/app/useDialog';
import useTabRoute from 'hooks/navigator/useTabRoute';
import { FieldDataType } from 'types/event/filedDataType';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import {
  CategorySelector,
  Tab,
  TabItem,
  TicketList,
} from 'components/userEvent/participant';
import MENT_HOST from 'constants/userEvent/host/hostMessage';
import { BottomTabMenu } from 'constants/menu';
import userEventScreenStyles from './UserEventScreen.style';

// TODO skeleton

const UserEventScreen = () => {
  const { params } = useTabRoute<BottomTabMenu.UserEvent>();
  const { stackNavigation } = useNavigator();
  const { openDialog } = useDialog();

  const [activeTabName, setActiveTabName] = useState<UserEventTabItem>(
    UserEventTabItem.PARTICIPANT,
  );

  const [field, setField] = useState<FieldDataType[]>(fieldInitData);
  const activeField = field.find((fieldData) => fieldData.isActive);

  // TODO: 무한스크롤 test 필요
  const { data: ticketLists } = useUserTicketLists(
    activeTabName === UserEventTabItem.PARTICIPANT
      ? activeField?.value
      : undefined,
  );

  const flatUserTicketList = ticketLists?.pages.flatMap(
    (page) => page.data.content,
  );

  const {
    data: hostEventList,
    hasNextPage,
    fetchNextPage,
  } = useHostEventLists(
    activeTabName === UserEventTabItem.HOST ? activeField?.value : undefined,
  );

  const flatHostEventList = hostEventList?.pages.flatMap(
    (page) => page.data.content,
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemSeparatorComponent = () => <Spacing height={15} />;

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
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
        text: '아직 승인되지 않은 이벤트입니다.',
      });
      return;
    }
    stackNavigation.navigate('HostConsole', { eventId: event.eventInfoId });
  };

  useEffect(() => {
    if (params && params.tab) {
      setActiveTabName(params.tab);
    }
  }, []);

  // TODO
  if (!ticketLists) {
    return null;
  }

  // TODO
  if (!hostEventList) {
    return null;
  }

  return (
    <View style={userEventScreenStyles.container}>
      <Tab>
        <TabItem
          label={UserEventTabItem.PARTICIPANT}
          isActive={activeTabName === UserEventTabItem.PARTICIPANT}
          onPress={() => handleTab(UserEventTabItem.PARTICIPANT)}
        />
        <TabItem
          label={UserEventTabItem.HOST}
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
          <View style={userEventScreenStyles.emptyContainer}>
            <Text>{MENT_PARTICIPANT.MAIN.EMPTY}</Text>
          </View>
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
              onEndReachedThreshold={0.2}
              onEndReached={onEndReached}
            />
          </View>
        ))}

      {/* 주최 이벤트 */}
      {activeTabName === UserEventTabItem.HOST &&
        (flatHostEventList?.length === 0 ? (
          <View style={userEventScreenStyles.emptyContainer}>
            <Text>{MENT_HOST.MAIN.EMPTY}</Text>
          </View>
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
              onEndReachedThreshold={0.2}
              onEndReached={onEndReached}
            />
          </View>
        ))}
    </View>
  );
};

export default UserEventScreen;
