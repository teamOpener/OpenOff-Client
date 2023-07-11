import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { ScrollView, Text, TextInput, View } from 'react-native';
import NaverMapView from 'react-native-nmap';
import { colors } from 'styles/theme';
import MapFieldButtonGroup from 'components/eventMap/groups/MapFieldButtonGroup/MapFieldButtonGroup';
import EventSearchInput from 'components/eventMap/inputs/EventSearchInput/EventSearchInput';
import eventList from 'data/lists/eventList';
import MapEventCard from 'components/eventMap/cards/MapEventCard/MapEventCard';
import eventMapScreenStyles from './EventMapScreen.style';

const EventMapScreen = () => {
  const P0 = { latitude: 37.564362, longitude: 126.977011 };
  const getFieldEvent = (value: string) => {
    console.log(value);
  };
  const handleEventSearch = (value: string) => {
    return false;
  };
  const handleShowCalendar = () => {
    return false;
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
        <BottomSheetScrollView
          style={eventMapScreenStyles.bottomSheetContainer}
        >
          {eventList.map((event) => (
            <MapEventCard key={event.id} event={event} />
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default EventMapScreen;
