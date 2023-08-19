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
  },

  SUCCESS: {
    //
  },

  ERROR: {
    UNAPPROVED: '승인되지 않은 이벤트입니다.\n승인완료 후 다시 시도해주세요.',
    OVERFLOW_AVAILABLE: '신청 가능 인원보다 많습니다.',
  },
});

export default MENT_HOST;
