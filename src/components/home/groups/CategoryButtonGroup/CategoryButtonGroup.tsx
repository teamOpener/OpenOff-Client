import Text from 'components/common/Text/Text';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import categoryButtonGroupStyles from './CategoryButtonGroup.style';

const CategoryButtonGroup = () => {
  return (
    <View>
      <View style={categoryButtonGroupStyles.container}>
        <TouchableOpacity>
          <ImageBackground
            source={require('../../../../assets/images/field/food&drink.png')}
            resizeMode="cover"
            style={categoryButtonGroupStyles.categoryImage}
          >
            <Text variant="body3" color="white">
              Inside
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryButtonGroup;
