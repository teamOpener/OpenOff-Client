import Text from 'components/common/Text/Text';
import SelectDetailButton from 'components/eventMap/buttons/SelectDetailButton/SelectDetailButton';
import { View } from 'react-native';
import Option from 'types/apps/selectbox';
import selectDetailBoxStyles from './SelectDetailBox.style';

interface Props {
  currentOption: Option;
  options: Option[];
  label: string;
  select: (option: Option) => void;
}

const SelectDetailBox = ({ currentOption, options, label, select }: Props) => {
  return (
    <View style={selectDetailBoxStyles.container}>
      <Text variant="h3" color="white">
        {label}
      </Text>
      <View style={selectDetailBoxStyles.selectBoxContainer}>
        {options.map((option) => (
          <SelectDetailButton
            key={option.value}
            option={option}
            isActive={currentOption.value === option.value}
            handlePress={select}
          />
        ))}
      </View>
    </View>
  );
};

export default SelectDetailBox;
