import EventRowCardList from 'components/home/lists/EventRowCardList/EventRowCardList';
import eventList from 'mocks/lists/eventList';
import { View } from 'react-native';
import wishEventScreenStyles from './WishEventScreen.style';

const WishEventScreen = () => {
  return (
    <View style={wishEventScreenStyles.container}>
      <EventRowCardList eventList={eventList} />
    </View>
  );
};

export default WishEventScreen;
