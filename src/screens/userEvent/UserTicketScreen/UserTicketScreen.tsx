import { useState } from 'react';
import { Dimensions, LayoutChangeEvent, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useUserTickets } from 'hooks/queries/ledger';
import useNavigator from 'hooks/navigator/useNavigator';
import {
  CONSTANT_PARTICIPANT,
  UserTicketStatus,
} from 'constants/userEvent/participant/participantConstants';
import { RootStackParamList } from 'types/apps/menu';
import { StatusButton, TicketCard } from 'components/userEvent/participant';
import userTicketScreenStyles from './UserTicketScreen.style';

type UserTicketScreenRouteProp = RouteProp<RootStackParamList, 'UserTicket'>;

const UserTicketScreen = () => {
  const { params } = useRoute<UserTicketScreenRouteProp>();
  const { stackNavigation } = useNavigator();
  const { data: tickets, isLoading } = useUserTickets(params.eventId);

  const [curTicketStatus, setCurTicketStatus] = useState<UserTicketStatus>(
    UserTicketStatus.WAITING,
  );

  const { width } = Dimensions.get('window');
  const [carouselHeight, setCarouselHeight] = useState<number>(
    CONSTANT_PARTICIPANT.CAROUSEL_INITIAL_HEIGHT,
  );

  const handleHeight = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setCarouselHeight(height);
  };

  const handleStatus = (index: number) => {
    // TODO: status 뭘로 알아낼지, 처음 꺼는 바로 받아오기
    setCurTicketStatus(UserTicketStatus.APPROVED);
  };

  const handlePressQR = () => {
    // TODO: QR 보러가기
    stackNavigation.navigate('UserQR', {
      eventId: 1,
      ticketId: 'E-D6A8F11F26',
    });
  };

  // TODO
  if (isLoading) {
    return null;
  }

  // TODO
  if (!tickets) {
    return null;
  }

  return (
    <View style={userTicketScreenStyles.container}>
      <Carousel
        // TODO: loop아닌척하기 - 후순위
        loop
        width={width * 0.86}
        height={carouselHeight}
        overscrollEnabled={false}
        panGestureHandlerProps={{ minDist: 24 }}
        style={[userTicketScreenStyles.carousel, { width }]}
        mode="parallax"
        modeConfig={{
          parallaxScrollingOffset: 64,
          parallaxScrollingScale: 0.9,
          parallaxAdjacentItemScale: 0.77,
        }}
        onScrollEnd={handleStatus}
        data={tickets}
        renderItem={({ item }) => (
          <TicketCard
            key={item.eventIndexId}
            onLayout={handleHeight}
            ticketInfo={item}
          />
        )}
      />

      <StatusButton status={curTicketStatus} onPress={handlePressQR} />
    </View>
  );
};

export default UserTicketScreen;
