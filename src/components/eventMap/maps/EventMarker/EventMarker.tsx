import { Dispatch, SetStateAction } from 'react';
import { Marker } from 'react-native-nmap';
import { colors } from 'styles/theme';
import { Event } from 'types/event';

interface Props {
  clickedMarker: string | null;
  setClickedMarker: Dispatch<SetStateAction<string | null>>;
  event: Event;
}

const EventMarker = ({ clickedMarker, setClickedMarker, event }: Props) => {
  return (
    <Marker
      key={event.id}
      image={require('../../../../assets/images/eventCoordinate.png')}
      width={event.id === clickedMarker ? 80 : 50}
      height={event.id === clickedMarker ? 80 : 50}
      coordinate={{
        latitude: event.coordinate.latitude,
        longitude: event.coordinate.longitude,
      }}
      onClick={() => {
        setClickedMarker(event.id);
      }}
      pinColor={colors.background}
    />
  );
};

export default EventMarker;
