export interface EventLadgerTotalStatusResponseDto {
  eventIndexId: number;
  eventTitle: string;
  eventDate: string;
  isClosed: boolean;
  isEnded: boolean;
  maxCount: number;
  notApprovedCount: number;
  approvedCount: number;
  joinedCount: number;
}
