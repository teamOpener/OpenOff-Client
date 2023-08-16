import MAX_POSTER from 'constants/event';

const MENT_OPEN_EVENT = Object.freeze({
  // TODO: 정리
  INFO: '이벤트 정보를 입력해주세요.',
  FIELD_HELP_TEXT: '여러 개의 장르 선택이 가능하고, 장르 검색시 적용됩니다.',
  DATE_PICKER_PLACEHOLDER: '날짜를 선택해주세요.',
  DATE_PICKER_TITLE: '날짜를 선택해주세요.',
  TIME_PICKER_TITLE: '시간을 선택해주세요.',
  ADDRESS_PLACEHOLDER: '주소를 검색해주세요',
  ADDRESS_DETAIL_PLACEHOLDER: '상세 주소를 입력해주세요',
  IMAGE_UPLOAD_HELP_TEXT: '최소 1장의 사진을 등록해주세요.',
  ADDITIONAL_PLACEHOLDER: '추가로 수집할 정보를 입력해주세요',

  ERROR_FIELD: '최소 1개 이상의 분야를 선택해주세요.',
  ERROR_TITLE: '이벤트 제목을 입력해주세요.',
  ERROR_APPLICATION_DATE: '이벤트 신청 기간을 설정해주세요.',
  ERROR_DATE: '최소 1개 이상의 이벤트 일시를 등록해주세요.',

  HEADER: {
    SEARCH_ADDRESS: '주소를 검색해주세요.',
  },
  MAIN: {
    COST: '₩ 가격을 입력해주세요.',
    SUBMIT: '개설하기',
    IMAGE: '이벤트 관련 이미지 업로드',
    ADDITIONAL_INFO: '추가 수집 정보',
    HOST_NAME: '업체(주최자)명',
    STAFF: '이벤트 관리자 추가',
    HOST_PHONE: '전화번호',
    HOST_EMAIL: '이메일',
    EMPTY_NICKNAME: '검색 결과가 없습니다.',
  },
  LOADING: {
    CREATE: '이벤트 업로드 중이에요!',
  },
  SUCCESS: {
    CREATE_EVENT_TITLE: '이벤트 개설 신청이 완료되었습니다!',
    CREATE_EVENT_CONTENT:
      '해당 이벤트는 관리자 승인 이후 업로드 될 예정입니다.',
  },
  ERROR: {
    MAX_FIELD: '최대 3개 장르까지 선택 가능합니다.',
    ADDRESS: '이벤트 장소를 등록해주세요.',
    COST: '가격을 입력해주세요.',
    RECRUITMENT: '모집 인원를 입력해주세요.',
    DESCRIPTION: '이벤트 상세 내용을 입력해주세요.',
    MAX_IMAGE: `최대 ${MAX_POSTER}장까지 등록이 가능합니다.`,
    HOST_NAME: '업체(주최자)명을 입력해주세요.',
    HOST_PHONE: '전화번호를 입력해주세요.',
    INVALID_HOST_PHONE: '올바른 전화번호를 입력해주세요.',
    HOST_EMAIL: '이메일을 입력해주세요.',
    INVALID_HOST_EMAIL: '유효한 이메일을 입력해주세요.',
    CREATE_EVENT: '이벤트를 업로드하는데 실패했습니다. 다시 시도해주세요.',
    UPLOAD_IMAGE: '이미지를 업로드하는데 실패했습니다. 다시 시도해주세요.',
    UPLOAD_TYPE:
      '이벤트를 업로드하는데 실패했습니다. 양식을 다시 확인해주세요.',
  },
  PLACEHOLDER: {
    DESCRIPTION:
      '다음과 같은 정보를 입력해주세요.\n\n-이벤트 상세 설명 및 소개\n-나이 제한 (신분증 지참)\n-이벤트 준비물\n-유료 이벤트의 경우 현장 결제 안내',
    ADDITIONAL_INFO: '추가로 수집할 정보를 입력해주세요.',
    HOST_NAME: '업체(주최자)명을 입력해주세요.',
    STAFF: '@닉네임을 태그해서 추가해주세요.',
    HOST_PHONE: '01012345678',
    HOST_EMAIL: 'opener@off.com',
  },
  HELP_TEXT: {
    IMAGE: `최소 1장의 사진을 등록해주세요. (최대 ${MAX_POSTER}장)`,
  },
});

export default MENT_OPEN_EVENT;
