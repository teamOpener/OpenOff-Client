import ColorButton from 'components/authorize/buttons/ColorButton/ColorButton';
import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import Text from '../../../common/Text/Text';
import genderInputStyles from './GenderInput.style';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const GenderInput = ({ value, setValue }: Props) => {
  const computedGenderStyle = (compareGender: string) => {
    return {
      handlePress:
        value === compareGender
          ? () => {
              return false;
            }
          : () => setValue(compareGender),
      backgroundColor: value === compareGender ? colors.main : 'transparent',
      borderColor: value === compareGender ? 'transparent' : colors.main,
      color:
        value === compareGender
          ? ('white' as keyof typeof colors)
          : ('main' as keyof typeof colors),
    };
  };
  return (
    <View style={genderInputStyles.container}>
      <Text variant="h4" color="white">
        성별
      </Text>
      <View style={genderInputStyles.genderButtonContainer}>
        <ColorButton
          label="남"
          color={computedGenderStyle('남').color}
          marginRight={10}
          borderColor={computedGenderStyle('남').borderColor}
          backgroundColor={computedGenderStyle('남').backgroundColor}
          handleClick={computedGenderStyle('남').handlePress}
        />
        <ColorButton
          label="여"
          color={computedGenderStyle('여').color}
          marginRight={10}
          borderColor={computedGenderStyle('남').borderColor}
          backgroundColor={computedGenderStyle('여').backgroundColor}
          handleClick={computedGenderStyle('여').handlePress}
        />
      </View>
    </View>
  );
};

export default GenderInput;
