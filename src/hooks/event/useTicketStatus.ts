import { UserTicketStatus } from 'constants/userEvent/participant/participantConstants';
import i18n from 'locales';
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
        return i18n.t('ended_event_info');
      case UserTicketStatus.ATTENDED:
        return i18n.t('used_ticket_info');
      default:
        return null;
    }
  };

  return { getEventTicketStatus, getEventTicketStatusHelpText };
};

export default useTicketStatus;
