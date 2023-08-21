export const CONSTANT_PARTICIPANT = Object.freeze({
  CAROUSEL_INITIAL_HEIGHT: 481,
  BAR_INITIAL_HEIGHT: 48,
  CIRCLE_RADIUS: 14,
  TICKET_MORE_BTN_PADDING_RIGHT: 5,
  TICKET_WIDTH: 312,
  QR_BUTTON_HEIGHT: 60,
});

export const enum UserEventTabItem {
  PARTICIPANT = '참여 이벤트',
  HOST = '주최 이벤트',
}

/**
 * 1. Waiting - 승인 대기 중
 * 2. Denied - 승인 거부
 * 3. Approved - 승인 완료 (참석 전)
 * 4. Attended - 참석 완료
 * 5. Ended - 종료
 * 4. Canceled - 신청 취소
 */
export const enum UserTicketStatus {
  WAITING = 'Waiting',
  DENIED = 'Denined',
  APPROVED = 'Approved',
  ATTENDED = 'Attended',
  ENDED = 'Ended',
  CANCELED = 'Canceld',
}
