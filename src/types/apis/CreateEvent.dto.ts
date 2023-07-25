import FieldCode from 'constants/code';

export interface CreateEventDto {
  field: FieldCode[];
  title: string | null;
  applicationStartDate: string | null;
  applicationEndDate: string | null;
  eventDates: string[]; // 2023-07-01T00:00:00;
  address: string | null;
  cost: number;
  recruitmentNumber: number | null;
  description: string | null;
  imageUrls: string[];
  additionalInformation: string[];
  host: {
    name: string | null;
    phoneNumber: string | null;
    email: string | null;
  };
}
