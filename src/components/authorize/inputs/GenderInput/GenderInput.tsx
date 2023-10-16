import i18n from 'locales';
import ColorButton from 'components/authorize/buttons/ColorButton/ColorButton';
import { GenderType } from 'constants/authorize/join';
import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import { Gender } from 'types/join';
import Text from '../../../common/Text/Text';
import genderInputStyles from './GenderInput.style';

interface Props {
  value: Gender;
  setValue: Dispatch<SetStateAction<Gender>>;
}

const GenderInput = ({ value, setValue }: Props) => {
  const computedGenderAction = (compareGender: Gender) => {
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
      <Text style={genderInputStyles.title}>{i18n.t('gender')}</Text>
      <View style={genderInputStyles.genderButtonContainer}>
        <ColorButton
          label={i18n.t('man')}
          color={computedGenderAction(GenderType.MAN).color}
          marginRight={10}
          borderColor={computedGenderAction(GenderType.MAN).borderColor}
          backgroundColor={computedGenderAction(GenderType.MAN).backgroundColor}
          handleClick={computedGenderAction(GenderType.MAN).handlePress}
        />
        <ColorButton
          label={i18n.t('woman')}
          color={computedGenderAction(GenderType.WOMAN).color}
          marginRight={10}
          borderColor={computedGenderAction(GenderType.WOMAN).borderColor}
          backgroundColor={
            computedGenderAction(GenderType.WOMAN).backgroundColor
          }
          handleClick={computedGenderAction(GenderType.WOMAN).handlePress}
        />
      </View>
    </View>
  );
};

export default GenderInput;
