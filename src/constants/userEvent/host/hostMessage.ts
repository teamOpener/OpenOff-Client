const MENT_HOST = Object.freeze({
  MAIN: {
    EMPTY: '주최한 이벤트가 없습니다.',
    EDIT: '수정',
    COMMENT: '댓글',
    APPROVED: '승인완료',
    ATTENDED: '입장완료',
    QR_SCAN_BTN: 'QR 입장권 스캔',
    LEDGER: '명단관리(일괄승인)',
    STAFF_MANAGEMENT: '스태프 관리',
    STOP_APPLICATION: '신청중단',
    ENDED: '종료된 이벤트입니다.',
    QR_SCAN_MAIN_INFO: 'QR 티켓을 스캔해주세요.',
    QR_SCAN_SUB_INFO: '네모박스에 맞추어 QR코드를 스캔해주세요.',
    EMPTY_LEDGER: '아직 신청인원이 존재하지 않습니다.',
    CANCEL_BUTTON: '이벤트 취소',
    CANCEL_TITLE: '이벤트를 취소하시겠습니까?',
    CANCEL_DESCRIPTION: `개설된 이벤트가 삭제되며, 신청자들에게 취소 알림이 발송됩니다. \n*잦은 취소는 서비스 정지 사유에 해당됩니다`,
    SUSPENSE_EVENT: '이벤트 신청을 중단하시겠습니까?',
    PERMIT_ALL: '일괄 승인하시겠습니까?',
  },
  SUCCESS: {
    SUSPENSE_EVENT: '이벤트 신청이 중단되었습니다.',
    PERMIT_ALL: '일괄 승인되었습니다.',
  },
  ERROR: {
    UNAPPROVED: '승인되지 않은 이벤트입니다. \n승인완료 후 다시 시도해주세요.',
    OVERFLOW_AVAILABLE: '신청 가능 인원보다 많습니다.',
  },
});

export default MENT_HOST;
