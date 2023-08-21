import Icon from 'components/common/Icon/Icon';
import AdvertisementCarousel from 'components/home/carousels/AdvertisementCarousel/AdvertisementCarousel';
import FloatingButton from 'components/home/floatingbutton/FloatingButton';
import CategoryButtonGroup from 'components/home/groups/CategoryButtonGroup/CategoryButtonGroup';
import EventCardList from 'components/home/lists/EventCardList/EventCardList';
import { StackMenu } from 'constants/menu';
import Spacing from 'components/common/Spacing/Spacing';
import fieldData from 'data/lists/fieldData';
import useNavigator from 'hooks/navigator/useNavigator';
import { usePersonalEventLists, useVogueEventLists } from 'hooks/queries/event';
import { useMyInfo } from 'hooks/queries/user';
import advertisementList from 'mocks/lists/advertisementList';
import { useCallback, useEffect } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { foregroundListener, requestAlarmPermission } from 'services/fcm';
import homeScreenStyles from './HomeScreen.style';

const HomeScreen = () => {
  const { stackNavigation } = useNavigator();

  const { data: vogueEventLists, isLoading: isVogueLoading } =
    useVogueEventLists();
  const { data: personalEventLists, isLoading: isPersonalLoading } =
    usePersonalEventLists();
  const { data: userInfo } = useMyInfo();

  const userInterest = userInfo?.userInfo.fieldTypeList.map((field) => {
    return `#${
      fieldData.find((fieldElement) => fieldElement.value === field)?.label
    }   `;
  });

  const handleCategoryPress = (value: string) => {
    stackNavigation.navigate(StackMenu.CategoryEvent, { fieldValue: value });
  };

  const handleShowBookmarkEvent = () => {
    stackNavigation.navigate(StackMenu.BookmarkEvent);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={homeScreenStyles.container}
      >
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
            <TouchableOpacity onPress={handleShowBookmarkEvent}>
              <Icon name="IconHeart" fill="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <AdvertisementCarousel carouselData={advertisementList} />
        <CategoryButtonGroup handlePress={handleCategoryPress} />

        <Spacing height={20} />

        <EventCardList
          isLoading={isPersonalLoading}
          events={personalEventLists}
          title="맞춤 이벤트 추천"
          subTitle={userInterest?.join('') ?? ''}
        />
        <EventCardList
          isLoading={isVogueLoading}
          events={vogueEventLists?.content}
          title="인기 이벤트"
          subTitle="지금 핫한 인기 이벤트를 둘러보세요."
          type="popular"
        />
        <Spacing height={20} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
