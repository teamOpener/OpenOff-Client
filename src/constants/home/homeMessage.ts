const MENT_HOME = Object.freeze({
  CATEGORY: {},
  BOOKMARK: {},
  MAIN: {
    /** - ~명 신청완료 */
    TOTAL_APPLICANT_MENT: '명 신청완료',
    /** - 이런! 아직 이벤트가 존재하지 않아요! */
    EMPTY_EVENT: '이런! 아직 이벤트가 존재하지 않아요!',
    /** - 전체보기 */
    SHOW_ALL: '전체보기',
    /** - 맞춤 이벤트 추천 */
    PERSONAL_EVENT_COMMEND: '맞춤 이벤트 추천',
    /** - 인기 이벤트 */
    POPULAR_EVENT: '인기 이벤트',
    /** - 지금 핫한 인기 이벤트를 둘러보세요. */
    POPULAR_EVENT_SUB_TITLE: '지금 핫한 인기 이벤트를 둘러보세요.',
  },
  ALERT: {
    /** - 오늘 */
    TODAY: '오늘',
    /** - 어제 */
    YESTERDAY: '어제',
    /** - M월 N일 */
    ALERT_DIFF_DAY: (newRegDate: Date) =>
      `${newRegDate.getMonth() + 1}월 ${newRegDate.getDate()}일`,
  },
});

export default MENT_HOME;
