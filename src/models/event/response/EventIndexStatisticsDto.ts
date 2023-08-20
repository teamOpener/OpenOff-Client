export interface EventIndexStatisticsDto {
  eventIndexId: number;
  approvedUserCount: number;
  eventDate: string;
  isApply: boolean; // 내가 신청안했고 날짜가 안지났으면 true
}
