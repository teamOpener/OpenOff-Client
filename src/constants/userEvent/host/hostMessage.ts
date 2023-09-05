const MENT_HOST = Object.freeze({
  MAIN: {
    EMPTY: '주최한 이벤트가 없습니다.',
    EMPTY_QNA: '추가질문이 없습니다.',
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
    NO_PERMISSION: '카메라 권한을 허용해주세요.',
    DATE_SELECTER_FORMAT: 'YYYY.MM.DD (ddd) HH시 mm분',
    LEDGER_DATE_FORMAT: 'M/DD ddd요일 HH:MM',
    QNA_COUNT: (count: number) => `질문${count}`,
    SORT: {
      TITLE: '정렬 기준',
      DATE: '신청순',
      NAME: '이름순',
    },
  },
  STAFF: {
    ADD_CONFIRM: '추가하시겠습니까?',
    DELETE_CONFIRM: '정말 삭제하시겠습니까?',
    NICKNAME_PLACEHOLDER: '@닉네임을 입력해주세요.',
  },
  APPLICANT: {
    BACK_TO_APPLICANT: '신청명단으로 이동',
    DENY: {
      LABEL: '거절',
      TITLE: '승인을 거절하시겠습니까?',
      CONTENT: '사유를 선택해주세요.',
      SUCCESS: '승인이 거부되었습니다',
    },
    SHOW_DETAIL: '상세보기',
    APPROVE: {
      LABEL: '승인',
      SUCCESS: '성공적으로 승인되었습니다!',
    },
    CANCEL: {
      SUCCESS: '승인이 취소되었습니다',
      TITLE: '승인을 취소하시겠습니까?',
      LABEL: '승인취소',
    },
    ALL_APPROVE: '일괄 승인',
    APPROVE_WITH_COUNT: (approvedCount: number, maxCount: number) =>
      `승인완료 ${approvedCount}/${maxCount}`,
    ADMISSION_WITH_COUNT: (joinedCount: number, maxCount: number) =>
      `입장완료 ${joinedCount}/${maxCount}`,
    NOTAPPROVE_COUNT: (notApprovedCount: number) =>
      `${notApprovedCount}명 승인 대기중`,
    ADMISSION: '입장완료',
  },
  SUCCESS: {
    SUSPENSE_EVENT: '이벤트 신청이 중단되었습니다.',
    PERMIT_ALL: '일괄 승인되었습니다.',
    ADD_STAFF: '성공적으로 처리됐습니다!',
  },
  ERROR: {
    UNAPPROVED: '승인되지 않은 이벤트입니다. \n승인완료 후 다시 시도해주세요.',
    OVERFLOW_AVAILABLE: '신청 가능 인원보다 많습니다.',
  },
});

export default MENT_HOST;
