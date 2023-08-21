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
  isJoined: boolean;
  qrImageUrl: string | null;
}

/**
 * 승인대기: qrImageUrl === null
 * 승인거부
 * 승인완료: qrImageUrl !== null
 * 참석완료: isJoined === true
 * 종료된 이벤트: eventDate > new Date()
 * 취소: 없음
 */
