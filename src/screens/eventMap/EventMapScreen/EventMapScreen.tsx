import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Text from 'components/common/Text/Text';
import MapEventCard from 'components/eventMap/cards/MapEventCard/MapEventCard';
import SortDialog from 'components/eventMap/dialogs/SortDialog/SortDialog';
import MapFieldButtonGroup from 'components/eventMap/groups/MapFieldButtonGroup/MapFieldButtonGroup';
import EventSearchInput from 'components/eventMap/inputs/EventSearchInput/EventSearchInput';
import SingleSelectBox from 'components/eventMap/selectboxes/SingleSelectBox/SingleSelectBox';
import { StackMenu } from 'constants/menu';
import eventList from 'data/lists/eventList';
import {
  applicationAbleOption,
  participantOptions,
  payOptions,
} from 'data/selectData';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import NaverMapView from 'react-native-nmap';
import { colors } from 'styles/theme';
import { RootStackParamList } from 'types/apps/menu';
import Option from 'types/apps/selectbox';
import { Coordinate } from 'types/event';
import eventMapScreenStyles from './EventMapScreen.style';

interface SortInfo {
  dialog: boolean;
  value: string;
}

const EventMapScreen = () => {
  const P0 = { latitude: 37.56278008163968, longitude: 126.98795373156224 };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentCoordinate, setCurrentCoordinate] = useState<Coordinate>({
    latitude: 0,
    longitude: 0,
  });
  const [sort, setSort] = useState<SortInfo>({
    dialog: false,
    value: 'relevance',
  });
  const getFieldEvent = (value: string) => {
    console.log(value);
  };
  const handleEventSearch = (value: string) => {
    return false;
  };
  const handleShowCalendar = () => {
    navigation.navigate(StackMenu.DatePick);
  };
  return (
    <View style={eventMapScreenStyles.container}>
      <EventSearchInput
        handleSearch={handleEventSearch}
        handleCalendar={handleShowCalendar}
      />
      <MapFieldButtonGroup getFieldEvent={getFieldEvent} />
      <NaverMapView
        style={eventMapScreenStyles.mapContainer}
        center={{ ...P0, zoom: 16 }}
        onCameraChange={(event) => {
          setCurrentCoordinate({
            latitude: event.latitude,
            longitude: event.longitude,
          });
          console.log(event.latitude, event.longitude);
        }}
      />
      <BottomSheet
        index={0}
        snapPoints={[50, 450]}
        animateOnMount
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{
          backgroundColor: colors.white,
        }}
      >
        <View style={eventMapScreenStyles.selectContainer}>
          <SingleSelectBox
            options={payOptions}
            label="비용"
            select={(option: Option) => {
              return false;
            }}
          />
          <SingleSelectBox
            options={participantOptions}
            label="참여 인원"
            select={(option: Option) => {
              return false;
            }}
          />
          <SingleSelectBox
            options={applicationAbleOption}
            label="신청 현황"
            select={(option: Option) => {
              return false;
            }}
          />
        </View>
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

export default EventMapScreen;
