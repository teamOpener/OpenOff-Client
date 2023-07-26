import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import Geolocation, { GeoWatchOptions } from 'react-native-geolocation-service';
import NaverMapView from 'react-native-nmap';
import { PERMISSIONS } from 'react-native-permissions';
import { Coordinate } from 'types/event';
import { requestSinglePermisson } from 'utils/permission';

const useMapCoordinateInfo = () => {
  const naverMapRef = useRef<NaverMapView>(null);
  // 사용자의 스크린 위치정보
  const screenCoordinate = useRef<Coordinate>({
    latitude: 126.98795373156224,
    longitude: 37.56278008163968,
  });
  // 지도초기 위치정보(1회성 값)
  const [mapFocusCoordinate, setMapFocusCoordinate] = useState<Coordinate>({
    latitude: 126.98795373156224,
    longitude: 37.56278008163968,
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
        setMapFocusCoordinate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn('Location error:', error.message);
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
        console.log(error);
      },
      watchOptions,
    );
  };
  useEffect(() => {
    if (Platform.OS === 'ios')
      requestSinglePermisson(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(() => {
        getFirstCoordinate();
      });
    if (Platform.OS === 'android') {
      Promise.all([
        requestSinglePermisson(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION),
        requestSinglePermisson(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION),
      ]).then(() => {
        getFirstCoordinate();
      });
    }
  }, []);
  useEffect(() => {
    setGPSCoordinate();
    return () => {
      Geolocation.clearWatch(setGPSCoordinate());
    };
  }, []);
  return {
    screenCoordinate,
    mapFocusCoordinate,
    setMapFocusCoordinate,
    currentCoordinate,
    setCurrentCoordinate,
    naverMapRef,
    focusCoordinate,
    setFocusCoordinate,
  };
};

export default useMapCoordinateInfo;
