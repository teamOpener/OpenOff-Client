import { memo, useMemo } from 'react';
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
  const generateRandomLatitude = useMemo(() => {
    const min = 0.00001;
    const max = 0.00006;
    const randomNumber = Math.random() * (max - min) + min;
    return randomNumber;
  }, []);

  const generateRandomLongitude = useMemo(() => {
    const min = 0.00001;
    const max = 0.00006;
    const randomNumber = Math.random() * (max - min) + min;
    return randomNumber;
  }, []);

  const eventCoordinate = {
    latitude: event.latitude - generateRandomLatitude,
    longitude: event.longitude - generateRandomLongitude,
  };

  return (
    <Marker
      key={event.id}
      zIndex={10}
      animated
      image={require('../../../../assets/images/eventCoordinate.png')}
      width={event.id === clickedMarker ? 60 : 30}
      height={event.id === clickedMarker ? 60 : 30}
      coordinate={eventCoordinate}
      onClick={() => {
        handlePressMapCoordinate(event.id, eventCoordinate);
      }}
      pinColor={colors.main}
    />
  );
};

export default EventMarker;
