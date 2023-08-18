import { FieldCode } from 'constants/code';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Event {
  eventInfoId?: number;
  bookmarkId?: number;
  eventTitle: string;
  fieldTypes: FieldCode[];
  eventDate: string;
  mainImageUrl: string;
  streetRoadAddress: string;
  totalApplicantCount: number;
  isBookmarked: boolean;
}

interface ImageType {
  imageUrl: string;
  isMain: boolean;
}

interface MapEvent {
  id: number;
  title: string;
  fieldTypes: FieldCode[];
  streetLoadAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  distance?: number;
  imageList: ImageType[];
  eventDateList: string[];
}

export type { Coordinate, Event, MapEvent };
