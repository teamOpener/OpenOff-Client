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
import EventMarker from 'components/eventMap/maps/EventMarker/EventMarker';
import MapBottomSheet from 'components/eventMap/sheets/MapBottomSheet/MapBottomSheet';
import eventList from 'data/lists/eventList';
import useEventMapSelector from 'hooks/eventMap/useEventMapSelector';
import useMapCoordinateInfo from 'hooks/eventMap/useMapCoordinateInfo';
import { useEffect, useMemo, useState } from 'react';
import { BackHandler, Dimensions, View } from 'react-native';
import NaverMapView, { Marker } from 'react-native-nmap';
import { useEventMapStore } from 'stores/EventMap';
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
  const { sort, setSort, selectState, dispatch } =
    useEventMapSelector(eventList);
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const { params } = useRoute<RouteProp<ParamList, 'mapData'>>();
  const [focusCoordinate, setFocusCoordinate] = useState<Coordinate>(
    params.coordinate,
  );
  const [clickedMarker, setClickedMarker] = useState<string | null>(null);
  const [isFindActive, setIsFindActive] = useState<boolean>(false);
  const { callbackCoordinate } = useEventMapStore();
  const { screenCoordinate, currentCoordinate, naverMapRef } =
    useMapCoordinateInfo();
  const computedEventList = useMemo(() => {
    if (!clickedMarker) return eventList;
    return eventList.filter((event) => event.id === clickedMarker);
  }, [clickedMarker]);
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
  }, []);
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
          onMapClick={() => {
            setClickedMarker(null);
          }}
          onCameraChange={(event) => {
            screenCoordinate.current = {
              latitude: event.latitude,
              longitude: event.longitude,
            };
            setIsFindActive(() => {
              return (
                getDistanceCoordinate(focusCoordinate, {
                  latitude: event.latitude,
                  longitude: event.longitude,
                }) > 0.1
              );
            });
          }}
        >
          <Marker
            image={require('../../../assets/images/currentCoordinate.png')}
            width={50}
            height={50}
            coordinate={currentCoordinate}
            pinColor="blue"
          />
          {eventList.map((event) => (
            <EventMarker
              key={event.id}
              clickedMarker={clickedMarker}
              setClickedMarker={setClickedMarker}
              event={event}
            />
          ))}
        </NaverMapView>
      </View>
      <MapBottomSheet
        snapTop={(1 / 3) * Dimensions.get('window').height}
        snapBottom={Dimensions.get('window').height}
        sort={sort}
        setSort={setSort}
        selectState={selectState}
        dispatch={dispatch}
        eventList={computedEventList}
        clickedMarker={clickedMarker}
      />
    </View>
  );
};

export default FieldEventMapScreen;
