import { TouchableOpacity, View } from 'react-native';
import MENT_PARTICIPANT from 'constants/userEvent/participant/participantMessage';
import { UserTicketStatus } from 'constants/userEvent/participant/participantConstants';
import { StackMenu } from 'constants/menu';
import Text from 'components/common/Text/Text';
import { TicketQR } from 'components/userEvent/participant';
import useStackRoute from 'hooks/navigator/useStackRoute';
import useTicketStatus from 'hooks/event/useTicketStatus';
import { useUserTickets } from 'hooks/queries/ledger';
import { MyTicketInfoResponseDto } from 'models/ledger/response/MyTicketInfoResponseDto';
import userQRScreenStyles from './UserQRScreen.style';

const UserQRScreen = () => {
  const { params } = useStackRoute<StackMenu.UserQR>();
  const { data: tickets } = useUserTickets({
    eventInfoId: params.eventId,
  });
  const currentTicket: MyTicketInfoResponseDto | undefined = tickets?.find(
    (ticket) => ticket.ticketIndex === params.ticketId,
  );

  const { getEventTicketStatus, getEventTicketStatusHelpText } =
    useTicketStatus();

  const handleCancel = () => {
    // TODO
  };

  if (!currentTicket) {
    return null;
  }

  const status = getEventTicketStatus(currentTicket);

  const helpText = getEventTicketStatusHelpText(
    getEventTicketStatus(currentTicket),
  );

  return (
    <View style={userQRScreenStyles.container}>
      {helpText && (
        <View>
          <View style={userQRScreenStyles.absoluteStatus}>
            <Text style={userQRScreenStyles.topInfoText} color="error">
              {helpText}
            </Text>
          </View>
        </View>
      )}

      <View>
        <TicketQR status={status} ticket={currentTicket} />
      </View>

      {status === UserTicketStatus.APPROVED && (
        <>
          <TouchableOpacity
            activeOpacity={0.6}
            style={userQRScreenStyles.cancelBtn}
            onPress={handleCancel}
          >
            <Text variant="body3">{MENT_PARTICIPANT.MAIN.CANCEL_BTN}</Text>
          </TouchableOpacity>
          <View style={userQRScreenStyles.bottomInfo}>
            <Text variant="body3" style={userQRScreenStyles.bottomInfoText}>
              {MENT_PARTICIPANT.MAIN.ADMISSION_INFO}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default UserQRScreen;
