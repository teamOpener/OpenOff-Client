import { View } from 'react-native';
import Text from 'components/common/Text/Text';
import MENT_PARTICIPANT from 'constants/userEvent/participant/participantMessage';
import Icon from 'components/common/Icon/Icon';
import { UserTicketStatus } from 'constants/userEvent/participant/participantConstants';
import Image from 'components/common/Image/Image';
import { MyTicketInfoResponseDto } from 'models/ledger/response/MyTicketInfoResponseDto';
import ticketQRStyles from './TicketQR.style';

interface Props {
  status: UserTicketStatus;
  ticket: MyTicketInfoResponseDto;
}

const TicketQR = ({ status, ticket }: Props) => {
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
          style={ticketQRStyles.eventTitle}
        >
          {ticket.eventTitle}
        </Text>
        <Text
          color={status === UserTicketStatus.ATTENDED ? 'black' : 'white'}
          style={ticketQRStyles.ticketIndex}
        >{`${MENT_PARTICIPANT.MAIN.RESERVATION_NUMBER} : ${ticket.ticketIndex}`}</Text>
      </View>

      <View style={ticketQRStyles.qrWrapper}>
        {ticket.qrImageUrl ? (
          <Image
            style={ticketQRStyles.qrImage}
            source={{ uri: ticket.qrImageUrl }}
          />
        ) : (
          <Icon
            name="IconQR"
            size={200}
            fill="background"
            style={
              status !== UserTicketStatus.APPROVED &&
              ticketQRStyles.expiredQrWrapper
            }
          />
        )}
      </View>

      <View style={ticketQRStyles.userInfo}>
        <Text
          color={status === UserTicketStatus.ATTENDED ? 'black' : 'white'}
          variant="h3"
        >{`${ticket.username} | ${ticket.birth}`}</Text>
      </View>
    </View>
  );
};

export default TicketQR;
