import { Marker } from 'react-native-nmap';
import { colors } from 'styles/theme';
import { Coordinate, MapEvent } from 'types/event';

interface Props {
  clickedMarker: number | undefined;
  handlePressMapCoordinate: (
    eventId: number,
    eventCoordinate: Coordinate,
  ) => void;
  event: MapEvent;
}

const EventMarker = ({
  clickedMarker,
  handlePressMapCoordinate,
  event,
}: Props) => {
  const eventCoordinate = {
    latitude: event.latitude,
    longitude: event.longitude,
  };

  return (
    <Marker
      key={event.id}
      image={require('../../../../assets/images/eventCoordinate.png')}
      width={event.id === clickedMarker ? 80 : 50}
      height={event.id === clickedMarker ? 80 : 50}
      coordinate={eventCoordinate}
      onClick={() => {
        handlePressMapCoordinate(event.id, eventCoordinate);
      }}
      pinColor={colors.main}
    />
  );
};

export default EventMarker;
