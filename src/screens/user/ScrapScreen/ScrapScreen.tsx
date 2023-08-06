import { FlatList, ScrollView } from 'react-native';
import EventCard from 'components/home/cards/EventCard/EventCard';
import eventList from 'mocks/lists/eventList';
import Spacing from 'components/common/Spacing/Spacing';
import scrapScreenStyles from './ScrapScreen.style';

const ScrapScreen = () => {
  const handlePress = () => {
    return false;
  };

  return (
    <ScrollView nestedScrollEnabled style={scrapScreenStyles.container}>
      <FlatList
        nestedScrollEnabled
        numColumns={2}
        data={eventList}
        columnWrapperStyle={scrapScreenStyles.rowGap}
        renderItem={(event) => (
          <EventCard
            key={event.index}
            type="scrap"
            event={event.item}
            handlePress={handlePress}
          />
        )}
      />

      <Spacing height={100} />
    </ScrollView>
  );
};

export default ScrapScreen;
