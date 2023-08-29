import { ScrollView, View } from 'react-native';
import Text from 'components/common/Text/Text';
import Spacing from 'components/common/Spacing/Spacing';
import { useInterestFieldLists } from 'hooks/queries/interest';
import CategoryButton from 'components/home/buttons/CategoryButton/CategoryButton';
import categoryButtonGroupStyles from './CategoryButtonGroup.style';

interface Props {
  handlePress: (value: string) => void;
}

const CategoryButtonGroup = ({ handlePress }: Props) => {
  const { data: interestFields } = useInterestFieldLists();

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
        {interestFields &&
          interestFields.map((interestField) => (
            <CategoryButton
              fieldData={interestField}
              onPress={() => handlePress(interestField.interestConstName)}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default CategoryButtonGroup;
