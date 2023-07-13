import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MapEventCard from 'components/eventMap/cards/MapEventCard/MapEventCard';
import SortDialog from 'components/eventMap/dialogs/SortDialog/SortDialog';
import SelectBoxGroup from 'components/eventMap/groups/SelectBoxGroup/SelectBoxGroup';
import eventList from 'data/lists/eventList';
import React, { useRef, useState, useEffect } from 'react';
import Text from 'components/common/Text/Text';
import {
  Dimensions,
  TouchableOpacity,
  View,
  BackHandler,
  LogBox,
} from 'react-native';
import NaverMapView, { Marker } from 'react-native-nmap';
import { colors } from 'styles/theme';
import useMapCoordinateInfo from 'hooks/eventMap/useMapCoordinateInfo';
import Option from 'types/apps/selectbox';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Field } from 'types/apps/group';
import { Coordinate } from 'types/event';
import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from '@react-navigation/elements';
import eventMapScreenStyles from '../EventMapScreen/EventMapScreen.style';

interface SortInfo {
  dialog: boolean;
  value: string;
}

type ParamList = {
  mapData: {
    saveScreenCoordinate: (coordinate: Coordinate) => void;
    field: Field;
    coordinate: {
      latitude: number;
      longitude: number;
    };
  };
};

const FieldEventMapScreen = () => {
  const { params } = useRoute<RouteProp<ParamList, 'mapData'>>();
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const { screenCoordinate, setScreenCoordinate, currentCoordinate } =
    useMapCoordinateInfo();
  const naverMapRef = useRef<NaverMapView>(null);
  const [sort, setSort] = useState<SortInfo>({
    dialog: false,
    value: 'relevance',
  });
  useEffect(() => {
    navigation.setOptions({
      title: params.field.label,
      headerLeft: (props: HeaderBackButtonProps) =>
        HeaderBackButton({
          ...props,
          onPress() {
            params.saveScreenCoordinate(screenCoordinate);
            navigation.goBack();
          },
        }),
    });
    const backAction = () => {
      params.saveScreenCoordinate(screenCoordinate);
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });
  return (
    <View style={eventMapScreenStyles.container}>
      <View style={eventMapScreenStyles.mapContainer}>
        <NaverMapView
          ref={naverMapRef}
          showsMyLocationButton={false}
          style={eventMapScreenStyles.map}
          center={{ ...params.coordinate, zoom: 16 }}
          onCameraChange={(event) => {
            setScreenCoordinate({
              latitude: event.latitude,
              longitude: event.longitude,
            });
            console.log(event.latitude, event.longitude);
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
      <BottomSheet
        index={0}
        snapPoints={[
          (1 / 3) * Dimensions.get('window').height,
          Dimensions.get('window').height,
        ]}
        animateOnMount
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{
          backgroundColor: colors.white,
        }}
      >
        <SelectBoxGroup
          selectPay={(option: Option) => {
            return false;
          }}
          selectParticipant={(option: Option) => {
            return false;
          }}
          selectApplication={(option: Option) => {
            return false;
          }}
        />
        <View style={eventMapScreenStyles.sortButton}>
          <TouchableOpacity onPress={() => setSort({ ...sort, dialog: true })}>
            <Text variant="body2" color="white">
              {sort.value === 'distance' ? '거리순' : '관련도순'}
            </Text>
          </TouchableOpacity>
        </View>
        <BottomSheetScrollView
          style={eventMapScreenStyles.bottomSheetContainer}
        >
          {eventList.map((event) => (
            <MapEventCard key={event.id} event={event} />
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
      <SortDialog
        dialogShow={sort.dialog}
        value={sort.value}
        setValue={(value: string) =>
          setSort((sort) => {
            return { ...sort, value };
          })
        }
        handleDialog={() =>
          setSort((sort) => {
            return { ...sort, dialog: false };
          })
        }
      />
    </View>
  );
};

export default FieldEventMapScreen;
