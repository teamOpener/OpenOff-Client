import { Image, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <View>
        <Image source={require('../../../assets/images/logo.png')} />
      </View>
      <Text>홈</Text>
    </View>
  );
};

export default HomeScreen;
