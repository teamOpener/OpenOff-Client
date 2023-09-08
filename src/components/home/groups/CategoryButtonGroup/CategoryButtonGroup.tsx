import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import CategoryButton from 'components/home/buttons/CategoryButton/CategoryButton';
import MENT_HOME from 'constants/home/homeMessage';
import { useInterestFieldLists } from 'hooks/queries/interest';
import { ScrollView, View } from 'react-native';
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
        {MENT_HOME.CATEGORY.LABEL}
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
              key={interestField.interestConstName}
              fieldData={interestField}
              onPress={() => handlePress(interestField.interestConstName)}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default CategoryButtonGroup;
