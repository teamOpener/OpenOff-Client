import {
  HeaderBackButton,
  HeaderButtonProps,
} from '@react-navigation/elements';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CurrentFindButton from 'components/eventMap/buttons/CurrentFindButton/CurrentFindButton';
import eventList from 'data/lists/eventList';
import useMapBottomSheet from 'hooks/eventMap/useMapBottomSheet';
import useMapCoordinateInfo from 'hooks/eventMap/useMapCoordinateInfo';
import { useEffect, useState } from 'react';
import { BackHandler, Dimensions, View } from 'react-native';
import NaverMapView, { Marker } from 'react-native-nmap';
import { useAppStore } from 'stores/app';
import { Field } from 'types/apps/group';
import { Coordinate } from 'types/event';
import getDistanceCoordinate from 'utils/coordinate';
import eventMapScreenStyles from '../EventMapScreen/EventMapScreen.style';

type ParamList = {
  mapData: {
    field: Field;
    coordinate: {
      latitude: number;
      longitude: number;
    };
  };
};

const FieldEventMapScreen = () => {
  const { renderBottomSheet } = useMapBottomSheet(eventList);
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const { params } = useRoute<RouteProp<ParamList, 'mapData'>>();
  const [focusCoordinate, setFocusCoordinate] = useState<Coordinate>(
    params.coordinate,
  );
  const [isFindActive, setIsFindActive] = useState<boolean>(false);
  const { callbackCoordinate } = useAppStore();
  const { screenCoordinate, currentCoordinate, naverMapRef } =
    useMapCoordinateInfo();
  useEffect(() => {
    const backAction = () => {
      callbackCoordinate(screenCoordinate.current);
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    navigation.setOptions({
      title: params.field.label,
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: (props: HeaderButtonProps) => {
        return (
          <HeaderBackButton
            {...props}
            onPress={() => {
              callbackCoordinate(screenCoordinate.current);
              navigation.goBack();
            }}
          />
        );
      },
    });
    return () => backHandler.remove();
  });
  return (
    <View style={eventMapScreenStyles.container}>
      <View style={eventMapScreenStyles.mapContainer}>
        <CurrentFindButton
          handlePress={() => {
            setIsFindActive(false);
            setFocusCoordinate(screenCoordinate.current);
          }}
          isFindActive={isFindActive}
        />
        <NaverMapView
          ref={naverMapRef}
          showsMyLocationButton={false}
          style={eventMapScreenStyles.map}
          center={{ ...params.coordinate, zoom: 16 }}
          onCameraChange={(event) => {
            screenCoordinate.current = {
              latitude: event.latitude,
              longitude: event.longitude,
            };
            setIsFindActive(
              getDistanceCoordinate(focusCoordinate, screenCoordinate.current) >
                1.5,
            );
          }}
        >
          <Marker
            image={require('../../../assets/images/currentCoordinate.png')}
            width={50}
            height={50}
            coordinate={currentCoordinate}
            pinColor="blue"
          />
        </NaverMapView>
      </View>
      {renderBottomSheet(
        (1 / 3) * Dimensions.get('window').height,
        Dimensions.get('window').height,
      )}
    </View>
  );
};

export default FieldEventMapScreen;
