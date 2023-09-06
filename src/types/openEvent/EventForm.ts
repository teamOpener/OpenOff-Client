import { FieldCode } from 'constants/interest/interest';
import { SearchNicknameResponseDto } from 'models/user/response/SearchNicknameResponseDto';
import { Image } from 'react-native-image-crop-picker';

export interface ImageBuilder {
  localImage: Image;
  uploadUrl: string | null;
  isMain: boolean;
}
export interface EventForm {
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
  imageBuilders: ImageBuilder[];
  additionalInformation: string[];
  hostName: string | null;
  staffList: SearchNicknameResponseDto[];
  hostPhoneNumber: string | null;
  hostEmail: string | null;
}
