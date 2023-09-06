const MENT_HOME = Object.freeze({
  CATEGORY: {},
  BOOKMARK: {},
  MAIN: {
    TOTAL_APPLICANT_MENT: '명 신청완료',
    EMPTY_EVENT: '이런! 아직 이벤트가 존재하지 않아요!',
    SHOW_ALL: '전체보기',
    PERSONAL_EVENT_COMMEND: '맞춤 이벤트 추천',
    POPULAR_EVENT: '인기 이벤트',
    POPULAR_EVENT_SUB_TITLE: '지금 핫한 인기 이벤트를 둘러보세요.',
  },
  ALERT: {
    TODAY: '오늘',
    YESTERDAY: '어제',
    /** - MM월 DD일 */
    ALERT_DIFF_DAY: (newRegDate: Date) =>
      `${newRegDate.getMonth() + 1}월 ${newRegDate.getDate()}일`,
  },
});

export default MENT_HOME;
