import BottomSheet from '@gorhom/bottom-sheet';
import { Text, View } from 'react-native';
import NaverMapView from 'react-native-nmap';
import { colors } from 'styles/theme';
import eventMapScreenStyles from './EventMapScreen.style';

const EventMapScreen = () => {
  const P0 = { latitude: 37.564362, longitude: 126.977011 };
  return (
    <View style={eventMapScreenStyles.container}>
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
        <View style={eventMapScreenStyles.bottomSheetContainer}>
          <Text>Modal content above top navigation and bottom tabs</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default EventMapScreen;
