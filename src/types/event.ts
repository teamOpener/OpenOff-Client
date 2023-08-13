import { FieldCode } from 'constants/code';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Event {
  eventTitle: string;
  fieldTypes: FieldCode[];
  eventDate: string;
  mainImageUrl: string;
  streetRoadAddress: string;
  totalApplicantCount: number;
  isBookmarked: boolean;
}

interface MapEvent {
  id: number;
  title: string;
  fieldTypes: FieldCode[];
  streetLoadAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  imageList: string[];
  eventDateList: string[];
}

export type { Coordinate, Event, MapEvent };
