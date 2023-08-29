import { useState } from 'react';
import { Dimensions, LayoutChangeEvent, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useUserTickets } from 'hooks/queries/ledger';
import useNavigator from 'hooks/navigator/useNavigator';
import useStackRoute from 'hooks/navigator/useStackRoute';
import useTicketStatus from 'hooks/event/useTicketStatus';
import { CONSTANT_PARTICIPANT } from 'constants/userEvent/participant/participantConstants';
import { StatusButton, TicketCard } from 'components/userEvent/participant';
import { StackMenu } from 'constants/menu';
import userTicketScreenStyles from './UserTicketScreen.style';

const UserTicketScreen = () => {
  const { params } = useStackRoute<StackMenu.UserTicket>();
  const { stackNavigation } = useNavigator();

  /**
   * carousel ui 관련
   */
  const { width } = Dimensions.get('window');

  /**
   * ticket 정보
   */

  const { data: tickets } = useUserTickets({
    eventInfoId: params.eventId,
  });

  const { getEventTicketStatus } = useTicketStatus();

  /**
   * qr 보러가기
   */

  const handlePressQR = (ticketIndex: string) => {
    if (!tickets) {
      return;
    }

    stackNavigation.navigate('UserQR', {
      eventId: params.eventId,
      ticketId: ticketIndex,
    });
  };

  return (
    <View style={userTicketScreenStyles.container}>
      <Carousel
        // TODO: loop아닌척하기 - 후순위
        loop
        width={width * 0.86}
        height={520}
        overscrollEnabled={false}
        panGestureHandlerProps={{ minDist: 24 }}
        style={[userTicketScreenStyles.carousel, { width }]}
        mode="parallax"
        modeConfig={{
          parallaxScrollingOffset: 64,
          parallaxScrollingScale: 0.9,
          parallaxAdjacentItemScale: 0.77,
        }}
        data={tickets ?? []}
        renderItem={({ item }) => (
          <>
            <TicketCard key={item.eventIndexId} ticketInfo={item} />
            <StatusButton
              status={getEventTicketStatus(item)}
              ticketType={item.ticketType}
              onPress={() => handlePressQR(item.ticketIndex)}
            />
          </>
        )}
      />
    </View>
  );
};

export default UserTicketScreen;
