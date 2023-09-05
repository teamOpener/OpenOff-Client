const MENT_USER = Object.freeze({
  INTEREST_RESET: {
    COMMENTS_ON_SETTING_INTERESTS: ['관심 분야를 설정해주세요.'],
  },
  PASSWORD_RESET: {
    PASSWORD_RESET_MENT: '비밀번호를 재설정해주세요.',
    NEW_PASSWORD: '새 비밀번호',
    NEW_PASSWORD_CHECK: '새 비밀번호 확인',
    INPUT_PASSWORD: '비밀번호를 입력해주세요',
    INPUT_PASSWORD_CHECK: '비밀번호 확인을 입력해주세요',
  },
  PROFILE_EDIT: {
    EMAIL: '이메일',
    USER_NAME: '이름',
    NICK_NAME: '닉네임',
    PASSWORD: '비밀번호',
    PHONENUMBER: '휴대폰 번호',
    USER_BIRTH: '생년월일',
    /** YYYY월 MM월 DD일 */
    USER_BIRTH_VALUE: (year?: number, month?: number, day?: number) =>
      `${year}년 ${month}월 ${day}일`,
    WITHDRAWAL: '회원탈퇴',
    WITHDRAWAL_MENT: '회원정보를 삭제하시겠어요?',
    WITHDRAWAL_CHECK_MENT: '정말로 탈퇴하시겠습니까?',
    PROGRESS_WITHDRAWAL: '회원탈퇴 중입니다.',
  },
  MAIN: {
    USER_INTEREST_FIELD: '관심 분야',
    MY_TICKET: '내 티켓',
    MY_BOOKMARK: '찜한 목록',
    HOST_EVENT: '주최 이벤트',
    MY_COMMENT: '내가 쓴 댓글',
    CUSTOMER_SERVICE_CENTER: '고객센터',
    FAQ: 'FAQ',
    ANNOUNCEMENT: '공지사항',
    TERM: '약관',
    TERM_TO_USE: '서비스 이용약관',
    TERM_TO_PRIVACY: '개인정보 수집',
    TERM_TO_MARKETING: '마케팅 정보 수신동의',
    INQUIRY: '문의하기',
    SETTING: '설정',
    SERVICE_SETTING: '서비스 설정',
    LOGOUT: '로그아웃',
    LOGOUT_MENT: '로그아웃 중입니다.',
  },
  SUCCESS: {
    PASSWORD_RESET_SUCCESS: '비밀번호를 성공적으로 재설정했습니다!',
    INTEREST_SETTING_SUCCESS: '관심분야 설정이 완료되었습니다!',
  },
  ERROR: {
    SERVER: '서버상에 알 수 없는 에러가 발생했습니다!',
    SERVER_IMAGE_ERROR: '서버상에 오류로 이미지 업로드가 실패했습니다.',
    IMAGE_OVERFLOW: '프로필 이미지는 한장만 선택 가능합니다.',
  },
  AUTHORIZE_BUTTON_TEXT: '확인',
});

export default MENT_USER;
