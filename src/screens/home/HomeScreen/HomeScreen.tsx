import Icon from 'components/common/Icon/Icon';
import CommonCarousel from 'components/home/carousels/CommonCarousel/CommonCarousel';
import CategoryButtonGroup from 'components/home/groups/CategoryButtonGroup/CategoryButtonGroup';
import attentionEvent from 'data/events/attentionEvent';
import { Image, View } from 'react-native';
import homeScreenStyles from './HomeScreen.style';

const HomeScreen = () => {
  return (
    <View style={homeScreenStyles.container}>
      <View style={homeScreenStyles.homeHeader}>
        <Image
          style={homeScreenStyles.logo}
          source={require('../../../assets/images/logo.png')}
        />
        <View />
        <View>
          <Icon name="IconHeart" fill="white" size={20} />
        </View>
      </View>
      <CommonCarousel carouselData={attentionEvent} />
      <CategoryButtonGroup />
    </View>
  );
};

export default HomeScreen;
