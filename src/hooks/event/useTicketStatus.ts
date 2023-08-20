import { UserTicketStatus } from 'constants/userEvent/participant/participantConstants';
import MENT_PARTICIPANT from 'constants/userEvent/participant/participantMessage';
import { MyTicketInfoResponseDto } from 'models/ledger/response/MyTicketInfoResponseDto';

const useTicketStatus = () => {
  const getEventTicketStatus = (
    ticketInfo: MyTicketInfoResponseDto,
  ): UserTicketStatus => {
    if (new Date(ticketInfo.eventDate) < new Date()) {
      return UserTicketStatus.ENDED;
    }
    if (ticketInfo.isJoined) {
      return UserTicketStatus.ATTENDED;
    }
    if (ticketInfo.qrImageUrl) {
      return UserTicketStatus.APPROVED;
    }
    return UserTicketStatus.WAITING;
  };

  const getEventTicketStatusHelpText = (
    status: UserTicketStatus,
  ): string | null => {
    switch (status) {
      case UserTicketStatus.ENDED:
        return MENT_PARTICIPANT.MAIN.ENDED_INFO;
      case UserTicketStatus.ATTENDED:
        return MENT_PARTICIPANT.MAIN.ATTENDED_INFO;
      default:
        return null;
    }
  };

  return { getEventTicketStatus, getEventTicketStatusHelpText };
};

export default useTicketStatus;
