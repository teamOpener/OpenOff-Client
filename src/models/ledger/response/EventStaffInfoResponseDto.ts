import StaffType from '../entity/StaffType';

export interface EventStaffInfoResponseDto {
  eventStaffId: number;
  staffType: StaffType;
  userId: string;
  staffName: string;
}
