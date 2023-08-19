import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import CurrentFieldFindButton from 'components/eventMap/buttons/CurrentFieldFindButton/CurrentFieldFindButton';
import MyCoordinateButton from 'components/eventMap/buttons/MyCoordinateButton/MyCoordinateButton';
import MapFieldButtonGroup from 'components/eventMap/groups/MapFieldButtonGroup/MapFieldButtonGroup';
import EventSearchInput from 'components/eventMap/inputs/EventSearchInput/EventSearchInput';
import EventMarker from 'components/eventMap/maps/EventMarker/EventMarker';
import MapBottomSheet from 'components/eventMap/sheets/MapBottomSheet/MapBottomSheet';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import queryKeys from 'constants/queryKeys';
import { SelectStatus } from 'constants/selectBox';
import useEventListFormatter from 'hooks/eventMap/useEventListFormatter';
import useEventMapSelector from 'hooks/eventMap/useEventMapSelector';
import useMapCoordinateInfo from 'hooks/eventMap/useMapCoordinateInfo';
import { useEventMapInstance } from 'hooks/queries/event';
import { useCallback, useRef, useState } from 'react';
import { BackHandler, Dimensions, Pressable, View } from 'react-native';
import NaverMapView, { Marker } from 'react-native-nmap';
import { useEventMapStore } from 'stores/EventMap';
import { colors } from 'styles/theme';
import { Field } from 'types/apps/group';
import NaverMapEvent from 'types/apps/map';
import { BottomTabParamList, RootStackParamList } from 'types/apps/menu';
import { Coordinate } from 'types/event';
import getDistanceCoordinate from 'utils/coordinate';
import {
  defaultTabBarStyles,
  eventMapScreenStyles,
} from './EventMapScreen.style';

type EventMapScreenRouteProp = RouteProp<BottomTabParamList, 'EventMap'>;

const EventMapScreen = () => {
  const queryClient = useQueryClient();
  const { params } = useRoute<EventMapScreenRouteProp>();
  const eventIdParam = useRef<string | undefined>(
    params ? params.eventId : undefined,
  );

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { resetStartEndDate } = useEventMapStore();
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

  // 거리순, 날짜순 정렬 및 선택자(비용 & 참여인원 & 신청현황), 검색어값 setter, 쿼리파라미터
  const {
    sort,
    setSort,
    selectState,
    selectDispatch,
    setSearchValue,
    calculateQueryParams,
  } = useEventMapSelector(
    screenCoordinate.current,
    currentCoordinate,
    focusCoordinate,
    eventIdParam.current,
    fieldMapMode,
  );

  // 클릭된 마커의 아이디값
  const [clickedMarker, setClickedMarker] = useState<number | undefined>(
    undefined,
  );

  const { data: eventList, isLoading } = useEventMapInstance(
    calculateQueryParams(),
  );

  const firstMapLoadChecker =
    currentCoordinate.latitude === 0 && currentCoordinate.longitude === 0;

  const { computedEventList } = useEventListFormatter(
    sort,
    currentCoordinate,
    clickedMarker,
    eventList,
  );

  // search값 반영함수
  const handleEventSearch = (value: string) => {
    setSearchValue(value);
    queryClient.removeQueries(queryKeys.eventKeys.mapList);
  };

  const handleMoveUserCurrentCoordinate = () => {
    naverMapRef.current?.animateToCoordinate(currentCoordinate);
    queryClient.removeQueries(queryKeys.eventKeys.mapList);
  };

  const handleFieldFindCoordinate = () => {
    setCurrentFindActive(false);
    setFocusCoordinate(screenCoordinate.current);
    queryClient.removeQueries(queryKeys.eventKeys.mapList);
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
    setFieldMapMode(() => {
      return undefined;
    });
    navigation.setOptions({
      tabBarStyle: {
        ...defaultTabBarStyles,
        display: 'flex',
      },
      headerShown: false,
    });
    queryClient.removeQueries(queryKeys.eventKeys.mapList);
  };

  const makeScreenHeader = (field: Field) => {
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
  };

  const handlePressMapCoordinate = (
    eventId: number,
    eventCoordinate: Coordinate,
  ) => {
    setClickedMarker(eventId);
    naverMapRef.current?.animateToCoordinate(eventCoordinate);
  };

  const handleShowFieldEvent = useCallback(
    (field: Field) => {
      selectDispatch({ type: SelectStatus.RESET_SELECT });
      setSearchValue('');
      resetStartEndDate();
      setFieldMapMode(() => {
        return field;
      });
      setFocusCoordinate(() => {
        return screenCoordinate.current;
      });
      makeScreenHeader(field);
      setClickedMarker(undefined);
      queryClient.removeQueries(queryKeys.eventKeys.mapList);
    },
    [navigation],
  );

  const bottomSheetLength = {
    snapTop:
      clickedMarker || fieldMapMode
        ? (1 / 3) * Dimensions.get('window').height
        : 100,
    snapBottom: fieldMapMode
      ? Dimensions.get('window').height - 90
      : (2 / 3) * Dimensions.get('window').height,
  };

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
    <>
      {firstMapLoadChecker && (
        <WithIconLoading isActive backgroundColor={colors.background} />
      )}
      <View style={eventMapScreenStyles.container}>
        {!fieldMapMode && (
          <>
            <EventSearchInput handleSearch={handleEventSearch} />
            <MapFieldButtonGroup handleShowFieldEvent={handleShowFieldEvent} />
          </>
        )}
        <View style={eventMapScreenStyles.mapContainer}>
          {fieldMapMode ? (
            <CurrentFieldFindButton
              handlePress={handleFieldFindCoordinate}
              isFindActive={currentFindActive}
            />
          ) : (
            <MyCoordinateButton handlePress={handleMoveUserCurrentCoordinate} />
          )}
          <NaverMapView
            ref={naverMapRef}
            showsMyLocationButton={false}
            style={eventMapScreenStyles.map}
            center={{ ...firstPlaceCoordinate, zoom: 17 }}
            onCameraChange={handleCameraEvent}
            minZoomLevel={7}
            onMapClick={() => {
              setClickedMarker(undefined);
              eventIdParam.current = undefined;
            }}
          >
            <Marker
              image={require('../../../assets/images/currentCoordinate.png')}
              width={50}
              height={50}
              coordinate={currentCoordinate}
              pinColor={colors.black}
            />
            {eventList?.map((event) => (
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
          selectDispatch={selectDispatch}
          clickedMarker={clickedMarker}
          eventList={computedEventList}
          isLoading={isLoading}
        />
      </View>
    </>
  );
};

export default EventMapScreen;
