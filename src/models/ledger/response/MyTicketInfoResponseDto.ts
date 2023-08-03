import TicketType from '../entity/TicketType';

export interface MyTicketInfoResponseDto {
  username: string;
  birth: string;
  eventInfoId: number;
  eventIndexId: number;
  eventTitle: string;
  streetRoadAddress: string;
  ticketIndex: string;
  ticketType: TicketType;
  eventDate: string;
  isAccepted: boolean;
  qrImageUrl: string;
  ledger: number;
}

// get ladger/tickets/eventInfoId -> MyTicketInfoResponseDto[]
