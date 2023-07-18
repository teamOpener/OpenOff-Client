interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Event {
  id: string;
  eventType: string;
  date: string;
  images: string[];
  name: string;
  place: string;
  participant: number;
  like: boolean;
  coordinate: Coordinate;
}

export type { Coordinate, Event };
