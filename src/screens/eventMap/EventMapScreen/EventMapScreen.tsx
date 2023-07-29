import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import Icon from 'components/common/Icon/Icon';
import CurrentFindButton from 'components/eventMap/buttons/CurrentFindButton/CurrentFindButton';
import MyCoordinateButton from 'components/eventMap/buttons/MyCoordinateButton/MyCoordinateButton';
import MapFieldButtonGroup from 'components/eventMap/groups/MapFieldButtonGroup/MapFieldButtonGroup';
import EventSearchInput from 'components/eventMap/inputs/EventSearchInput/EventSearchInput';
import EventMarker from 'components/eventMap/maps/EventMarker/EventMarker';
import MapBottomSheet from 'components/eventMap/sheets/MapBottomSheet/MapBottomSheet';
import eventList from 'data/lists/eventList';
import useEventMapSelector from 'hooks/eventMap/useEventMapSelector';
import useMapCoordinateInfo from 'hooks/eventMap/useMapCoordinateInfo';
import { useCallback, useMemo, useRef, useState } from 'react';
import { BackHandler, Dimensions, Pressable, View } from 'react-native';
import NaverMapView, { Marker } from 'react-native-nmap';
import { colors } from 'styles/theme';
import { Field } from 'types/apps/group';
import NaverMapEvent from 'types/apps/map';
import { RootStackParamList } from 'types/apps/menu';
import getDistanceCoordinate from 'utils/coordinate';
import { Coordinate } from 'types/event';
import {
  defaultTabBarStyles,
  eventMapScreenStyles,
} from './EventMapScreen.style';

const EventMapScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [fieldMapMode, setFieldMapMode] = useState<Field | undefined>(
    undefined,
  );

  // 현 위치 검색버튼 활성화 여부
  const [currentFindActive, setCurrentFindActive] = useState<boolean>(false);

  // 스크린 위치 & 현재 위치 & 초기 지도위치 & 현위치 검색 저장좌표 & 네이버 맵 useRef
  const {
    screenCoordinate,
    currentCoordinate,
    firstPlaceCoordinate,
    naverMapRef,
    focusCoordinate,
    setFocusCoordinate,
  } = useMapCoordinateInfo();

  // 거리순, 날짜순 정렬 및 선택자(비용 & 참여인원 & 신청현황)
  const { sort, setSort, selectState, dispatch } =
    useEventMapSelector(eventList);

  // 클릭된 마커의 아이디값
  const [clickedMarker, setClickedMarker] = useState<string | null>(null);

  // 검색어값
  const searchValue = useRef<string>('');

  // search값 반영함수
  const handleEventSearch = useCallback((value: string) => {
    searchValue.current = value;
  }, []);

  const handleMoveCurrentCoordinate = () => {
    naverMapRef.current?.animateToCoordinate(currentCoordinate);
  };

  const handleCameraEvent = (event: NaverMapEvent) => {
    screenCoordinate.current = {
      latitude: event.latitude,
      longitude: event.longitude,
    };
    setCurrentFindActive(() => {
      return (
        getDistanceCoordinate(focusCoordinate, {
          latitude: event.latitude,
          longitude: event.longitude,
        }) > 0.1
      );
    });
  };

  const recallEventMap = () => {
    navigation.setOptions({
      tabBarStyle: {
        ...defaultTabBarStyles,
        display: 'flex',
      },
      headerShown: false,
    });
    setFieldMapMode(() => {
      return undefined;
    });
  };

  const handlePressMapCoordinate = (
    eventId: string,
    eventCoordinate: Coordinate,
  ) => {
    setClickedMarker(eventId);
    naverMapRef.current?.animateToCoordinate(eventCoordinate);
  };

  const handleShowFieldEvent = useCallback(
    (field: Field) => {
      setFieldMapMode(field);
      navigation.setOptions({
        tabBarStyle: {
          ...defaultTabBarStyles,
          display: 'none',
        },
        headerTitle: field.label,
        headerShown: true,
        headerTintColor: colors.white,
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft: () => (
          <Pressable
            style={eventMapScreenStyles.backButton}
            onPress={recallEventMap}
          >
            <Icon name="IconArrowLeft" fill="white" />
          </Pressable>
        ),
        headerStyle: {
          backgroundColor: colors.background,
        },
      });
      setClickedMarker(null);
    },
    [navigation],
  );

  const bottomSheetLength = {
    snapTop:
      clickedMarker || fieldMapMode
        ? (1 / 3) * Dimensions.get('window').height
        : 80,
    snapBottom: fieldMapMode
      ? Dimensions.get('window').height - 90
      : (2 / 3) * Dimensions.get('window').height,
  };

  const computedEventList = useMemo(() => {
    if (!clickedMarker) return eventList;
    return eventList.filter((event) => event.id === clickedMarker);
  }, [clickedMarker]);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (fieldMapMode) {
          recallEventMap();
          return true;
        }
        return false;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, [!fieldMapMode]),
  );

  return (
    <View style={eventMapScreenStyles.container}>
      {!fieldMapMode && (
        <>
          <EventSearchInput handleSearch={handleEventSearch} />
          <MapFieldButtonGroup handleShowFieldEvent={handleShowFieldEvent} />
        </>
      )}
      <View style={eventMapScreenStyles.mapContainer}>
        {fieldMapMode ? (
          <CurrentFindButton
            handlePress={() => {
              setCurrentFindActive(false);
              setFocusCoordinate(screenCoordinate.current);
            }}
            isFindActive={currentFindActive}
          />
        ) : (
          <MyCoordinateButton handlePress={handleMoveCurrentCoordinate} />
        )}
        <NaverMapView
          ref={naverMapRef}
          showsMyLocationButton={false}
          style={eventMapScreenStyles.map}
          center={{ ...firstPlaceCoordinate, zoom: 16 }}
          onCameraChange={handleCameraEvent}
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
              handlePressMapCoordinate={handlePressMapCoordinate}
              event={event}
            />
          ))}
        </NaverMapView>
      </View>
      <MapBottomSheet
        snapTop={bottomSheetLength.snapTop}
        snapBottom={bottomSheetLength.snapBottom}
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
