import { View } from 'react-native';
import Text from 'components/common/Text/Text';
import MENT_PARTICIPANT from 'constants/userEvent/participant/participantMessage';
import Icon from 'components/common/Icon/Icon';
import dayjs from 'dayjs';
import { UserTicketStatus } from 'constants/userEvent/participant/participantConstants';
import ticketQRStyles from './TicketQR.style';

interface Props {
  status: UserTicketStatus;
}

// TODO: mock data 적용
const TicketQR = ({ status }: Props) => {
  return (
    <View
      style={[
        ticketQRStyles.container,
        status === UserTicketStatus.ATTENDED &&
          ticketQRStyles.attendedContainer,
        status === UserTicketStatus.ENDED && ticketQRStyles.endedContainer,
      ]}
    >
      <View style={ticketQRStyles.eventInfo}>
        <Text
          color={status === UserTicketStatus.ATTENDED ? 'black' : 'white'}
          variant="h3"
        >
          MUSIC CARNIVAL
        </Text>
        <Text
          color={status === UserTicketStatus.ATTENDED ? 'black' : 'white'}
          style={ticketQRStyles.ticketIndex}
        >{`${MENT_PARTICIPANT.MAIN.RESERVATION_NUMBER} : E-D6A8F11F26`}</Text>
      </View>

      <View style={ticketQRStyles.qrWrapper}>
        {/* TODO: image로 */}
        <Icon
          name="IconQR"
          size={200}
          fill="background"
          style={
            status !== UserTicketStatus.APPROVED &&
            ticketQRStyles.expiredQrWrapper
          }
        />
      </View>

      <View style={ticketQRStyles.userInfo}>
        <Text
          color={status === UserTicketStatus.ATTENDED ? 'black' : 'white'}
          variant="h3"
        >{`김민지 | ${dayjs('1995-01-01').format('YYYY.MM.DD')}`}</Text>
      </View>
    </View>
  );
};

export default TicketQR;
