import EventCard from 'components/home/cards/EventCard/EventCard';
import eventList from 'mocks/lists/eventList';
import React from 'react';
import { FlatList, View } from 'react-native';
import scrapScreenStyles from './ScrapScreen.style';

const ScrapScreen = () => {
  const handlePress = () => {
    return false;
  };
  return (
    <View style={scrapScreenStyles.container}>
      <FlatList
        numColumns={2}
        data={eventList}
        renderItem={(event) => (
          <EventCard
            key={event.index}
            type="scrap"
            event={event.item}
            handlePress={handlePress}
          />
        )}
      />
    </View>
  );
};

export default ScrapScreen;
