import i18n from 'locales';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import AdvertisementCarousel from 'components/home/carousels/AdvertisementCarousel/AdvertisementCarousel';
import FloatingButton from 'components/home/floatingbutton/FloatingButton';
import CategoryButtonGroup from 'components/home/groups/CategoryButtonGroup/CategoryButtonGroup';
import EventCardList from 'components/home/lists/EventCardList/EventCardList';
import { StackMenu } from 'constants/app/menu';
import useNavigator from 'hooks/navigator/useNavigator';
import { useVogueEventLists } from 'hooks/queries/event';
import useResetQueries from 'hooks/queries/useResetQueries';
import { useCallback, useEffect } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { foregroundListener, requestAlarmPermission } from 'services/fcm';
import { useAuthorizeStore } from 'stores/Authorize';
import PersonalEventContainer from 'containers/home/PersonalEventContainer';
import useDialog from 'hooks/app/useDialog';
import homeScreenStyles from './HomeScreen.style';

const HomeScreen = () => {
  const { isLogin } = useAuthorizeStore();
  const { openDialog } = useDialog();
  const { stackNavigation } = useNavigator();

  const { data: vogueEventLists, isLoading: isVogueLoading } =
    useVogueEventLists();

  const handleCategoryPress = (value: string) => {
    stackNavigation.navigate(StackMenu.CategoryEvent, { fieldValue: value });
  };

  const handleShowBookmarkEvent = () => {
    if (!isLogin) {
      openDialog({
        type: 'confirm',
        text: i18n.t('need_to_login'),
        apply: () => {
          stackNavigation.navigate('Login');
        },
        applyText: i18n.t('yes'),
        closeText: i18n.t('no'),
      });
      return;
    }
    stackNavigation.navigate(StackMenu.BookmarkEvent);
  };

  const handleShowAlertList = () => {
    stackNavigation.navigate(StackMenu.Alert);
  };

  const { resetQueries } = useResetQueries();

  const foregroundListenerCallback = useCallback(() => {
    foregroundListener({ resetQueries });
  }, []);

  useEffect(() => {
    if (isLogin) {
      requestAlarmPermission();
      foregroundListenerCallback();
    }
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
          <View style={homeScreenStyles.controllerContainer}>
            {/* <TouchableOpacity
              style={homeScreenStyles.controllerButton}
              onPress={handleShowAlertList}
            >
              <Icon name="IconBell" fill="white" size={20} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={handleShowBookmarkEvent}>
              <Icon name="IconHeart" fill="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <AdvertisementCarousel />
        <CategoryButtonGroup handlePress={handleCategoryPress} />
        <Spacing height={20} />
        {isLogin && <PersonalEventContainer />}
        <EventCardList
          isLoading={isVogueLoading}
          events={vogueEventLists?.content}
          title={i18n.t('popular_event')}
          subTitle={i18n.t('popular_event_sub_title')}
          type="popular"
        />
        <Spacing height={20} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
