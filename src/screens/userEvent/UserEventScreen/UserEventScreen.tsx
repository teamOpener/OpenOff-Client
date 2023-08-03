import { ScrollView, View } from 'react-native';
import { useEffect, useState } from 'react';
import fieldInitData from 'constants/userEvent/participant/fieldData';
import { UserEventTabItem } from 'constants/userEvent/participant/participantConstants';
import MENT_PARTICIPANT from 'constants/userEvent/participant/participantMessage';
import { useUserTicketLists } from 'hooks/queries/ledger';
import useNavigator from 'hooks/navigator/useNavigator';
import { FieldDataType } from 'types/event/filedDataType';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import {
  CategorySelector,
  Tab,
  TabItem,
  TicketList,
} from 'components/userEvent/participant';
import userEventScreenStyles from './UserEventScreen.style';

const UserEventScreen = () => {
  const { stackNavigation } = useNavigator();
  // TODO: 무한스크롤
  const { data: ticketLists, isLoading } = useUserTicketLists();

  const [activeTabName, setActiveTabName] = useState<UserEventTabItem>(
    UserEventTabItem.PARTICIPANT,
  );

  const [field, setField] = useState<FieldDataType[]>(fieldInitData);
  const activeField = field.find((fieldData) => fieldData.isActive);

  const handleTab = (name: UserEventTabItem) => {
    setActiveTabName(name);
  };

  const handlePressTicket = (id: number) => {
    // TODO: id 가지고 이동
    stackNavigation.navigate('UserTicket', {
      eventId: 1,
    });
  };

  useEffect(() => {
    // TODO: activeField가 변할 때, filter
    // console.log(activeField?.label ?? '전체');
  }, [activeField]);

  // TODO
  if (!ticketLists) {
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
      {ticketLists.length === 0 ? (
        <View style={userEventScreenStyles.emptyContainer}>
          <Text>{MENT_PARTICIPANT.MAIN.EMPTY}</Text>
        </View>
      ) : (
        <ScrollView style={userEventScreenStyles.scrollContainer}>
          <SpaceLayout size={15}>
            {ticketLists.map((ticket) => (
              <TicketList
                key={ticket.eventInfoId}
                eventInfo={ticket}
                onPress={() => handlePressTicket(ticket.eventInfoId)}
              />
            ))}
          </SpaceLayout>
          <Spacing height={200} />
        </ScrollView>
      )}

      {/* TODO: 주최 이벤트 */}
    </View>
  );
};

export default UserEventScreen;
