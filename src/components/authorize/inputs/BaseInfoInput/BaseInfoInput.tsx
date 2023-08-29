import ErrorText from 'components/authorize/texts/ErrorText/ErrorText';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import { Dispatch, SetStateAction } from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from 'styles/theme';
import baseInfoInputStyles from './BaseInfoInput.style';

interface Props {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  validation: (value: string) => string | undefined;
}

const BaseInfoInput = ({ label, value, setValue, validation }: Props) => {
  const resetValue = (event: GestureResponderEvent) => {
    event.stopPropagation();
    setValue('');
  };
  return (
    <View style={baseInfoInputStyles.container}>
      <Text style={{ ...baseInfoInputStyles.labelText }}>{label}</Text>
      <Spacing height={20} />

      <View
        style={[
          baseInfoInputStyles.inputContainer,
          {
            borderBottomColor: validation(value) ? colors.error : colors.main,
          },
        ]}
      >
        <TextInput
          value={value}
          style={{
            ...baseInfoInputStyles.input,
            color: validation(value) ? colors.error : colors.white,
          }}
          onChangeText={(inputValue) => setValue(inputValue)}
        />

        <TouchableOpacity onPress={resetValue}>
          <Icon name="IconExitCircle" size={18} fill="main" />
        </TouchableOpacity>
      </View>

      <Spacing height={5} />

      <ErrorText validation={validation} value={value} />
    </View>
  );
};

export default BaseInfoInput;
