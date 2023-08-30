import TopFieldButton from 'components/home/buttons/TopFieldButton/TopFieldButton';
import { useId } from 'react';
import { ScrollView, View } from 'react-native';
import { Field } from 'types/interest';
import topFieldButtonGroupStyles from './TopFieldButtonGroup.style';

interface Props {
  field: Field[];
  handleFieldPress: (value: string) => void;
}

const TopFieldButtonGroup = ({ field, handleFieldPress }: Props) => {
  const fieldKey = useId();
  return (
    <View style={topFieldButtonGroupStyles.fieldContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {field.map((fieldElement, _id) => (
          <TopFieldButton
            key={fieldKey + _id}
            field={fieldElement}
            handlePress={handleFieldPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TopFieldButtonGroup;
