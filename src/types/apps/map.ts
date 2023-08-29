import { Coord } from 'react-native-nmap';

interface NaverMapEvent {
  latitude: number;
  longitude: number;
  zoom: number;
  contentsRegion: [Coord, Coord, Coord, Coord, Coord];
  coveringRegion: [Coord, Coord, Coord, Coord, Coord];
}

export default NaverMapEvent;
