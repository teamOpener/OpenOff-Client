import FieldCode from 'constants/code';

export interface EventBuilder {
  field: FieldCode[];
  title: string | null;
  applicationStartDate: string | null;
  applicationEndDate: string | null;
  eventDates: string[]; // 2023-07-01T00:00:00;
  address: {
    roadAddress: string | null;
    detailAddress: string | null;
  };
  cost: number | null;
  recruitmentNumber: number | null;
  description: string | null;
  imageUrls: string[];
  additionalInformation: string[];
  hostName: string | null;
  hostPhoneNumber: string | null;
  hostEmail: string | null;
}
