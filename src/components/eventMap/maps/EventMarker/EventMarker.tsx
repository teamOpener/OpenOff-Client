import { memo, useMemo } from 'react';
import { Marker } from 'react-native-nmap';
import { colors } from 'styles/theme';
import { Coordinate, MapEvent } from 'types/event';

interface Props {
  clickedMarker: Coordinate | undefined;
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
  const isMatchedCoordinate =
    clickedMarker?.latitude === event.latitude &&
    clickedMarker?.longitude === event.longitude;

  const markerCoordinate = {
    latitude: event.latitude,
    longitude: event.longitude,
  };

  return (
    <Marker
      key={event.id}
      zIndex={10}
      animated
      image={require('../../../../assets/images/eventCoordinate.png')}
      width={isMatchedCoordinate ? 60 : 30}
      height={isMatchedCoordinate ? 60 : 30}
      coordinate={markerCoordinate}
      onClick={() => {
        handlePressMapCoordinate(event.id, markerCoordinate);
      }}
      pinColor={colors.background}
    />
  );
};

export default EventMarker;
