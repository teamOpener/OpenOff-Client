import Icon from 'components/common/Icon/Icon';
import CommonCarousel from 'components/home/carousels/CommonCarousel/CommonCarousel';
import CategoryButtonGroup from 'components/home/groups/CategoryButtonGroup/CategoryButtonGroup';
import EventCardGroup from 'components/home/groups/EventCardGroup/EventCardGroup';
import attentionEvent from 'data/events/attentionEvent';
import eventList from 'data/lists/eventList';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import homeScreenStyles from './HomeScreen.style';

const HomeScreen = () => {
  return (
    <ScrollView style={homeScreenStyles.container}>
      <View style={homeScreenStyles.homeHeader}>
        <Image
          style={homeScreenStyles.logo}
          source={require('../../../assets/images/logo.png')}
        />
        <View />
        <View style={homeScreenStyles.controllerContainer}>
          <TouchableOpacity style={homeScreenStyles.controllerButton}>
            <Icon name="IconBell" fill="white" size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="IconHeart" fill="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <CommonCarousel carouselData={attentionEvent} />
      <CategoryButtonGroup />
      <EventCardGroup
        events={eventList}
        title="맞춤 이벤트 추천"
        subTitle="#공연 #파티"
      />
      <EventCardGroup
        events={eventList}
        title="인기 이벤트"
        subTitle="지금 핫한 인기 이벤트를 둘러보세요."
      />
    </ScrollView>
  );
};

export default HomeScreen;
