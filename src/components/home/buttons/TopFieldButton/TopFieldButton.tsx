import Text from 'components/common/Text/Text';
import { Pressable, View } from 'react-native';
import { colors } from 'styles/theme';
import { Field } from 'types/interest';
import topFieldButtonStyles from './TopFieldButton.style';

interface Props {
  field: Field;
  handlePress: (value: string) => void;
}

const TopFieldButton = ({ field, handlePress }: Props) => {
  return (
    <Pressable
      style={topFieldButtonStyles.container}
      onPress={() => handlePress(field.value)}
    >
      <Text
        style={topFieldButtonStyles.fieldText}
        color={field.isActive ? 'white' : 'grey'}
      >
        {field.label}
      </Text>
      <View
        style={{
          ...topFieldButtonStyles.delimiter,
          backgroundColor: field.isActive ? colors.main : colors.background,
        }}
      />
    </Pressable>
  );
};

export default TopFieldButton;
