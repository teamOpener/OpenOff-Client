import { ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import Spacing from 'components/common/Spacing/Spacing';
import { FieldCode } from 'constants/code';
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
      <Spacing height={10} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={categoryButtonGroupStyles.groupContainer}
        contentContainerStyle={categoryButtonGroupStyles.groupContentContainer}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePress(FieldCode.FD)}
          style={categoryButtonGroupStyles.buttonContainer}
        >
          <Icon name="IconTicketCircles" size={45} fill="main" />
          <View style={categoryButtonGroupStyles.textContainer}>
            <Text variant="bodySB" color="white">
              푸드
            </Text>
            <Text
              variant="bodySB"
              color="white"
              style={categoryButtonGroupStyles.centerDot}
            >
              •
            </Text>
            <Text variant="bodySB" color="white">
              드링크
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePress(FieldCode.EE)}
          style={categoryButtonGroupStyles.buttonContainer}
        >
          <Icon name="IconTicketStar" size={45} fill="main" />
          <View style={categoryButtonGroupStyles.textContainer}>
            <Text variant="bodySB" color="white">
              전시회
            </Text>
            <Text
              variant="bodySB"
              color="white"
              style={categoryButtonGroupStyles.centerDot}
            >
              •
            </Text>
            <Text variant="bodySB" color="white">
              플리마켓
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePress(FieldCode.S)}
          style={categoryButtonGroupStyles.buttonContainer}
        >
          <Icon name="IconTicketHeart" size={45} fill="main" />
          <View style={categoryButtonGroupStyles.textContainer}>
            <Text variant="bodySB" color="white">
              공연
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePress(FieldCode.PF)}
          style={categoryButtonGroupStyles.buttonContainer}
        >
          <Icon name="IconShuriken" size={45} fill="main" />
          <View style={categoryButtonGroupStyles.textContainer}>
            <Text variant="bodySB" color="white">
              파티
            </Text>
            <Text
              variant="bodySB"
              color="white"
              style={categoryButtonGroupStyles.centerDot}
            >
              •
            </Text>
            <Text variant="bodySB" color="white">
              페스티벌
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePress(FieldCode.EA)}
          style={categoryButtonGroupStyles.buttonContainer}
        >
          <Icon name="IconFourCircle" size={45} fill="main" />
          <View style={categoryButtonGroupStyles.textContainer}>
            <Text variant="body3" color="white">
              운동
            </Text>
            <Text
              variant="bodySB"
              color="white"
              style={categoryButtonGroupStyles.centerDot}
            >
              •
            </Text>
            <Text variant="body3" color="white">
              액티비티
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePress(FieldCode.FSDH)}
          style={categoryButtonGroupStyles.buttonContainer}
        >
          <Icon name="IconSnow" size={45} fill="main" />
          <View style={categoryButtonGroupStyles.textContainer}>
            <Text variant="body3" color="white">
              친목
            </Text>
            <Text
              variant="bodySB"
              color="white"
              style={categoryButtonGroupStyles.centerDot}
            >
              •
            </Text>
            <Text variant="body3" color="white">
              일일호프
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CategoryButtonGroup;
