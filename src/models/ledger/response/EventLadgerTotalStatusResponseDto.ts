export interface EventLadgerTotalStatusResponseDto {
  eventIndexId: number;
  eventDate: string;
  isClosed: boolean;
  maxCount: number;
  notApprovedCount: number;
  approvedCount: number;
  joinedCount: number;
}
