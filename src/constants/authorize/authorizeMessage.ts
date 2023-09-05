const MENT_AUTHORIZE = Object.freeze({
  LOGIN: {
    /** - 로그인 */
    LOGIN: '로그인',
    /** - 회원가입 */
    JOIN_THE_MEMBERSHIP: '회원가입',
    /** -   |   */
    EMPTY_BAR: '   |   ',
    /** - 아이디/비밀번호 찾기 */
    FIND_ID_PASSWORD: '아이디/비밀번호 찾기',
    /** - 이메일을 */
    INPUT_EMAIL: '이메일을',
    /** - 비밀번호를 */
    INPUT_PASSWORD: '비밀번호를',
    /** - 입력해주세요. */
    REQUEST_INPUT: '입력해주세요.',
  },
  MAIN: {
    /** - 다음 */
    NEXT: '다음',
    /** - 이메일 */
    EMAIL: '이메일',
    /** - 아이디 */
    ID: '아이디',
    /** - 비밀번호 */
    PASSWORD: '비밀번호',
  },
  FIND: {
    /** - 로그인 화면으로 */
    BACK_TO_LOGIN: '로그인 화면으로',
    /** - 비밀번호를 재설정해주세요. */
    RESET_PASSWORD: '비밀번호를 재설정해주세요.',
    /** - 새 비밀번호 */
    NEW_PASSWORD: '새 비밀번호',
    /** - 비밀번호를 입력해주세요 */
    INPUT_PASSWORD: '비밀번호를 입력해주세요',
    /** - 새 비밀번호 확인 */
    NEW_PASSWORD_CHECK: '새 비밀번호 확인',
    /** - 비밀번호 확인을 입력해주세요 */
    INPUT_PASSWORD_CHECK: '비밀번호 확인을 입력해주세요',
    /** - 비밀번호 변경이 완료되었습니다. */
    SUCCESS_RESET_PASSWORD: '비밀번호 변경이 완료되었습니다.',
    /** - 다시 로그인을 해주세요. */
    LOGIN_INTRODUCTORY_COMMENT: '다시 로그인을 해주세요.',
    /** - 아이디 찾기 결과입니다! */
    FIND_ID_RESULT: '아이디 찾기 결과입니다!',
    /** - 해당 핸드폰으로 등록된 아이디가 존재하지 않습니다! */
    CANNOT_FIND_ID: '해당 핸드폰으로 등록된 아이디가 존재하지 않습니다!',
    /** - 회원정보가 일치하지 않습니다. 이메일과 핸드폰 번호를 확인해주세요. */
    NOT_MATCHED_USER_INFO:
      '회원정보가 일치하지 않습니다. 이메일과 핸드폰 번호를 확인해주세요.',
    /** - 아이디 찾기 */
    FIND_ID: '아이디 찾기',
    /** - 비밀번호 찾기 */
    FIND_PASSWORD: '비밀번호 찾기',
  },
  PHONE_CERTIFICATION: {
    /** - 휴대폰 번호 */
    PHONE_NUMBER: '휴대폰 번호',
    /** - 재발송 */
    RESEND: '재발송',
    /** - 인증받기 */
    GET_CERTIFIED: '인증받기',
    /** - 인증번호 */
    CERTIFICATION_NUMBER: '인증번호',
    /** - 남은 시간 */
    REMAINING_TIME: '남은 시간',
    /** - 인증번호를 발송하였습니다. */
    SEND_CERTIFICATION_NUMBER_MESSAGE: '인증번호를 발송하였습니다.',
  },
  INTEREST_FIELD: {
    /** - 최대 3가지 선택 가능 */
    UP_TO_THREE_CAN_BE_SELECTED: '최대 3가지 선택 가능',
  },
  AGREE_TO_TERM: {
    /** - 확인 */
    CONFIRM: '확인',
    /** - 서비스 이용 약관에 동의해 주세요. */
    TITLE: ['서비스 이용 약관에', '동의해 주세요.'],
    /** - 네, 모두 동의합니다. */
    ALL_AGREE: '네, 모두 동의합니다.',
    /** - (필수) 만 14세 이상입니다. */
    TERM_TO_TEENAGER: '(필수) 만 14세 이상입니다.',
    /** - (필수) 서비스 이용약관 */
    TERM_TO_USE: '(필수) 서비스 이용약관',
    /** - (필수) 개인정보 수집 이용 */
    TERM_TO_PRIVACY: '(필수) 개인정보 수집 이용',
    /** - (선택) 마케팅 정보 수신동의 */
    TERM_TO_MARKETING: '(선택) 마케팅 정보 수신동의',
  },
  USER_INFO: {
    /** - 날짜를 선택해주세요. */
    SELECT_DATE: '날짜를 선택해주세요.',
    /** - 적용 */
    CONFIRM: '적용',
    /** - 닫기 */
    CANCEL: '닫기',
    /** - 성별 */
    GENDER: '성별',
    /** - 남성 */
    MAN: '남성',
    /** - 여성 */
    WOMAN: '여성',
  },
});

export default MENT_AUTHORIZE;
