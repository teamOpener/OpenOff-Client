import Text from 'components/common/Text/Text';
import FieldCode from 'constants/code';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import categoryButtonGroupStyles from './CategoryButtonGroup.style';

interface Props {
  handlePress: (value: string) => void;
}

const CategoryButtonGroup = ({ handlePress }: Props) => {
  return (
    <View style={categoryButtonGroupStyles.container}>
      <Text
        variant="h3"
        color="white"
        style={categoryButtonGroupStyles.titleContainer}
      >
        카테고리
      </Text>
      <View style={categoryButtonGroupStyles.groupContainer}>
        <TouchableOpacity
          onPress={() => handlePress(FieldCode.FD)}
          style={categoryButtonGroupStyles.buttonContainer}
        >
          <ImageBackground
            source={require('../../../../assets/images/field/food&drink.png')}
            resizeMode="cover"
            style={categoryButtonGroupStyles.categoryImage}
          >
            <View style={categoryButtonGroupStyles.textContainer}>
              <Text variant="body3" color="white">
                푸드
              </Text>
              <Text variant="body3" color="white">
                ·
              </Text>
              <Text variant="body3" color="white">
                드링크
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress(FieldCode.EE)}
          style={categoryButtonGroupStyles.buttonContainer}
        >
          <ImageBackground
            source={require('../../../../assets/images/field/exhibition&fleaMarket.png')}
            resizeMode="cover"
            style={categoryButtonGroupStyles.categoryImage}
          >
            <View style={categoryButtonGroupStyles.textContainer}>
              <Text variant="body3" color="white">
                전시회
              </Text>
              <Text variant="body3" color="white">
                ·
              </Text>
              <Text variant="body3" color="white">
                플리마켓
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress(FieldCode.S)}
          style={categoryButtonGroupStyles.buttonContainer}
        >
          <ImageBackground
            source={require('../../../../assets/images/field/performance.png')}
            resizeMode="cover"
            style={categoryButtonGroupStyles.categoryImage}
          >
            <View style={categoryButtonGroupStyles.textContainer}>
              <Text variant="body3" color="white">
                공연
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress(FieldCode.PF)}
          style={categoryButtonGroupStyles.buttonContainer}
        >
          <ImageBackground
            source={require('../../../../assets/images/field/concert.png')}
            resizeMode="cover"
            style={categoryButtonGroupStyles.categoryImage}
          >
            <View style={categoryButtonGroupStyles.textContainer}>
              <Text variant="body3" color="white">
                파티
              </Text>
              <Text variant="body3" color="white">
                ·
              </Text>
              <Text variant="body3" color="white">
                페스티벌
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress(FieldCode.EA)}
          style={categoryButtonGroupStyles.buttonContainer}
        >
          <ImageBackground
            source={require('../../../../assets/images/field/exercise&activity.png')}
            resizeMode="cover"
            style={categoryButtonGroupStyles.categoryImage}
          >
            <View style={categoryButtonGroupStyles.textContainer}>
              <Text variant="body3" color="white">
                운동
              </Text>
              <Text variant="body3" color="white">
                ·
              </Text>
              <Text variant="body3" color="white">
                액티비티
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress(FieldCode.FSDH)}
          style={categoryButtonGroupStyles.buttonContainer}
        >
          <ImageBackground
            source={require('../../../../assets/images/field/sociable.png')}
            resizeMode="cover"
            style={categoryButtonGroupStyles.categoryImage}
          >
            <View style={categoryButtonGroupStyles.textContainer}>
              <Text variant="body3" color="white">
                친목
              </Text>
              <Text variant="body3" color="white">
                ·
              </Text>
              <Text variant="body3" color="white">
                일일호프
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryButtonGroup;
