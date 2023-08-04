import { Dispatch, SetStateAction } from 'react';
import { Marker } from 'react-native-nmap';
import { colors } from 'styles/theme';
import { Coordinate, Event } from 'types/event';

interface Props {
  clickedMarker: string | null;
  handlePressMapCoordinate: (
    eventId: string,
    eventCoordinate: Coordinate,
  ) => void;
  event: Event;
}

const EventMarker = ({
  clickedMarker,
  handlePressMapCoordinate,
  event,
}: Props) => {
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
        handlePressMapCoordinate(event.id, event.coordinate);
      }}
      pinColor={colors.main}
    />
  );
};

export default EventMarker;
