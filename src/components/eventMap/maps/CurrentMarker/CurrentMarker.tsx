import { memo } from 'react';
import { Marker } from 'react-native-nmap';
import { colors } from 'styles/theme';
import { Coordinate } from 'types/event';

interface Props {
  currentCoordinate: Coordinate;
}

const CurrentMarker = ({ currentCoordinate }: Props) => {
  return (
    currentCoordinate.latitude !== 0 &&
    currentCoordinate.longitude !== 0 && (
      <Marker
        image={require('../../../../assets/images/currentCoordinate.png')}
        width={50}
        height={50}
        hidden={false}
        coordinate={currentCoordinate}
        pinColor={colors.black}
      />
    )
  );
};

export default memo(CurrentMarker);
