import { useFocusEffect } from '@react-navigation/native';
import useDialog from 'hooks/app/useDialog';
import { useCallback, useRef, useState } from 'react';
import { Platform } from 'react-native';
import Geolocation, { GeoWatchOptions } from 'react-native-geolocation-service';
import NaverMapView from 'react-native-nmap';
import { PERMISSIONS } from 'react-native-permissions';
import { requestSinglePermission } from 'services/permission';
import { Coordinate } from 'types/event';

const useMapCoordinateInfo = () => {
  const { openDialog } = useDialog();
  const naverMapRef = useRef<NaverMapView>(null);
  // 사용자의 스크린 위치정보
  const screenCoordinate = useRef<Coordinate>({
    latitude: 37.56278008163968,
    longitude: 126.98795373156224,
  });
  // 지도초기 위치정보(1회성 값)
  const [firstPlaceCoordinate, setFirstPlaceCoordinate] = useState<Coordinate>({
    latitude: 37.56278008163968,
    longitude: 126.98795373156224,
  });
  // 현 지도위치 검색을 위한 상태
  const [focusCoordinate, setFocusCoordinate] = useState<Coordinate>({
    latitude: 0,
    longitude: 0,
  });
  // 사용자 현재 위치정보
  const [currentCoordinate, setCurrentCoordinate] = useState<Coordinate>({
    latitude: 0,
    longitude: 0,
  });
  const getFirstCoordinate = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setFirstPlaceCoordinate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setCurrentCoordinate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        openDialog({
          type: 'validate',
          text: error.message,
        });
      },
      {
        enableHighAccuracy: true,
      },
    );
  };
  const setGPSCoordinate = () => {
    const watchOptions: GeoWatchOptions = {
      accuracy: {
        android: 'high',
        ios: 'best',
      },
      enableHighAccuracy: true,
      distanceFilter: 0,
      interval: 10000,
      showLocationDialog: true,
      forceRequestLocation: false,
      forceLocationManager: false,
    };
    return Geolocation.watchPosition(
      (position) => {
        setCurrentCoordinate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error.message);
      },
      watchOptions,
    );
  };
  useFocusEffect(
    useCallback(() => {
      let watchValue = 0;
      if (Platform.OS === 'ios')
        requestSinglePermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(
          () => {
            if (
              currentCoordinate.latitude === 0 &&
              currentCoordinate.longitude === 0
            ) {
              getFirstCoordinate();
              watchValue = setGPSCoordinate();
            }
          },
        );
      if (Platform.OS === 'android') {
        requestSinglePermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
          .then(() => {
            requestSinglePermission(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
          })
          .then(() => {
            if (
              currentCoordinate.latitude === 0 &&
              currentCoordinate.longitude === 0
            ) {
              getFirstCoordinate();
              watchValue = setGPSCoordinate();
            }
          });
      }
      return () => {
        Geolocation.clearWatch(watchValue);
      };
    }, []),
  );
  return {
    screenCoordinate,
    firstPlaceCoordinate,
    setFirstPlaceCoordinate,
    currentCoordinate,
    setCurrentCoordinate,
    naverMapRef,
    focusCoordinate,
    setFocusCoordinate,
  };
};

export default useMapCoordinateInfo;
