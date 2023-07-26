import { NavigationProp, useNavigation } from '@react-navigation/native';
import MyCoordinateButton from 'components/eventMap/buttons/MyCoordinateButton/MyCoordinateButton';
import MapFieldButtonGroup from 'components/eventMap/groups/MapFieldButtonGroup/MapFieldButtonGroup';
import EventSearchInput from 'components/eventMap/inputs/EventSearchInput/EventSearchInput';
import EventMarker from 'components/eventMap/maps/EventMarker/EventMarker';
import MapBottomSheet from 'components/eventMap/sheets/MapBottomSheet/MapBottomSheet';
import { StackMenu } from 'constants/menu';
import eventList from 'data/lists/eventList';
import useEventMapSelector from 'hooks/eventMap/useEventMapSelector';
import useMapCoordinateInfo from 'hooks/eventMap/useMapCoordinateInfo';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import NaverMapView, { Marker } from 'react-native-nmap';
import { useEventMapStore } from 'stores/EventMap';
import { Field } from 'types/apps/group';
import { RootStackParamList } from 'types/apps/menu';
import { Coordinate } from 'types/event';
import eventMapScreenStyles from './EventMapScreen.style';

const EventMapScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // 스크린 위치 & 현재 위치 & 초기 지도위치 & 네이버 맵 useRef
  const {
    screenCoordinate,
    currentCoordinate,
    mapFocusCoordinate,
    naverMapRef,
  } = useMapCoordinateInfo();
  const { setCallbackCoordinate } = useEventMapStore();
  // 거리순, 날짜순 정렬 및 선택자(비용 & 참여인원 & 신청현황)
  const { sort, setSort, selectState, dispatch } =
    useEventMapSelector(eventList);
  // 클릭된 마커의 아이디값
  const [clickedMarker, setClickedMarker] = useState<string | null>(null);
  // 검색어값
  const searchValue = useRef<string>('');
  const saveScreenCoordinate = useCallback(
    (coordinate: Coordinate) => {
      naverMapRef.current?.animateToCoordinate(coordinate);
    },
    [naverMapRef],
  );
  const getFieldEvent = useCallback(
    (field: Field) => {
      setCallbackCoordinate(saveScreenCoordinate);
      navigation.navigate(StackMenu.FieldEventMap, {
        field,
        coordinate: screenCoordinate.current,
      });
    },
    [navigation, saveScreenCoordinate, screenCoordinate, setCallbackCoordinate],
  );
  // 해당함수를 통해 search값 반영
  const handleEventSearch = useCallback((value: string) => {
    searchValue.current = value;
  }, []);
  const handleMoveCurrentCoordinate = () => {
    naverMapRef.current?.animateToCoordinate(currentCoordinate);
  };
  const computedEventList = useMemo(() => {
    if (!clickedMarker) return eventList;
    return eventList.filter((event) => event.id === clickedMarker);
  }, [clickedMarker]);
  return (
    <View style={eventMapScreenStyles.container}>
      <EventSearchInput handleSearch={handleEventSearch} />
      <MapFieldButtonGroup getFieldEvent={getFieldEvent} />
      <View style={eventMapScreenStyles.mapContainer}>
        <NaverMapView
          ref={naverMapRef}
          showsMyLocationButton={false}
          style={eventMapScreenStyles.map}
          center={{ ...mapFocusCoordinate, zoom: 16 }}
          onCameraChange={(event) => {
            screenCoordinate.current = {
              latitude: event.latitude,
              longitude: event.longitude,
            };
          }}
          onMapClick={() => {
            setClickedMarker(null);
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
        <MyCoordinateButton handlePress={handleMoveCurrentCoordinate} />
      </View>
      <MapBottomSheet
        snapTop={clickedMarker ? (1 / 3) * Dimensions.get('window').height : 80}
        snapBottom={(2 / 3) * Dimensions.get('window').height}
        sort={sort}
        setSort={setSort}
        selectState={selectState}
        dispatch={dispatch}
        clickedMarker={clickedMarker}
        eventList={computedEventList}
      />
    </View>
  );
};

export default EventMapScreen;
