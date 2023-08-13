import { useCallback, useEffect } from 'react';
import { foregroundListener, requestAlarmPermission } from 'services/fcm';
import Icon from 'components/common/Icon/Icon';
import AdvertisementCarousel from 'components/home/carousels/AdvertisementCarousel/AdvertisementCarousel';
import FloatingButton from 'components/home/floatingbutton/FloatingButton';
import CategoryButtonGroup from 'components/home/groups/CategoryButtonGroup/CategoryButtonGroup';
import EventCardList from 'components/home/lists/EventCardList/EventCardList';
import { StackMenu } from 'constants/menu';
import advertisementList from 'mocks/lists/advertisementList';
import eventList from 'mocks/lists/eventList';
import useNavigator from 'hooks/navigator/useNavigator';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import homeScreenStyles from './HomeScreen.style';

const HomeScreen = () => {
  const { stackNavigation } = useNavigator();

  const handleCategoryPress = (value: string) => {
    stackNavigation.navigate(StackMenu.CategoryEvent, { fieldValue: value });
  };

  const handleShowWishEvent = () => {
    stackNavigation.navigate(StackMenu.WishEvent);
  };

  const handleShowAlertList = () => {
    stackNavigation.navigate(StackMenu.Alert);
  };

  const foregroundListenerCallback = useCallback(() => {
    foregroundListener();
  }, []);

  useEffect(() => {
    requestAlarmPermission();
    foregroundListenerCallback();
  }, []);

  return (
    <View style={homeScreenStyles.wrapper}>
      <FloatingButton />
      <ScrollView style={homeScreenStyles.container}>
        <View style={homeScreenStyles.homeHeader}>
          <Image
            style={homeScreenStyles.logo}
            source={require('../../../assets/images/logo.png')}
          />
          <View />
          <View style={homeScreenStyles.controllerContainer}>
            <TouchableOpacity
              style={homeScreenStyles.controllerButton}
              onPress={handleShowAlertList}
            >
              <Icon name="IconBell" fill="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShowWishEvent}>
              <Icon name="IconHeart" fill="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <AdvertisementCarousel carouselData={advertisementList} />
        <CategoryButtonGroup handlePress={handleCategoryPress} />
        <EventCardList
          events={eventList}
          title="맞춤 이벤트 추천"
          subTitle="#공연 #파티"
        />
        <EventCardList
          events={eventList}
          title="인기 이벤트"
          subTitle="지금 핫한 인기 이벤트를 둘러보세요."
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
