import { useFocusEffect } from '@react-navigation/native';
import { memo, useCallback, useState } from 'react';
import { Marker } from 'react-native-nmap';
import { colors } from 'styles/theme';
import { Coordinate } from 'types/event';

interface Props {
  currentCoordinate: Coordinate;
}

const CurrentMarker = ({ currentCoordinate }: Props) => {
  const [rerender, setRerender] = useState<boolean>(false);
  useFocusEffect(
    useCallback(() => {
      setRerender(true);
      return () => {
        setRerender(false);
      };
    }, []),
  );
  return (
    rerender && (
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
