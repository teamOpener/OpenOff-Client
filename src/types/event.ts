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
  coordinate: Coordinate;
}

export type { Event, Coordinate };
