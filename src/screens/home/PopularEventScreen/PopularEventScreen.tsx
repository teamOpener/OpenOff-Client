import EventRowCardList from 'components/home/lists/EventRowCardList/EventRowCardList';
import eventList from 'mocks/lists/eventList';
import { View } from 'react-native';
import popularEventScreenStyles from './PopularEventScreen.style';

const PopularEventScreen = () => {
  return (
    <View style={popularEventScreenStyles.container}>
      <EventRowCardList eventList={eventList} />
    </View>
  );
};

export default PopularEventScreen;
