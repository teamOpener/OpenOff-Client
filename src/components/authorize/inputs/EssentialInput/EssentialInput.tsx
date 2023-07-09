import ErrorText from 'components/authorize/texts/ErrorText/ErrorText';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Text, TextInput, View } from 'react-native';
import { colors } from 'styles/theme';
import essentialInputStyles from './EssentialInput.style';

interface Props extends React.ComponentProps<typeof TextInput> {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  type: string;
  keyboardType?: 'default' | 'number-pad';
  validation: (value: string) => string | undefined;
  children?: ReactNode;
}

const EssentialInput = ({
  label,
  value,
  setValue,
  type,
  keyboardType = 'default',
  validation,
  children,
  maxLength = 20,
  ...rest
}: Props) => {
  const clacWidth = children ? 260 : 350;
  const handleChangeText = (
    textValue: string,
    onChange: Dispatch<SetStateAction<string>>,
  ) => {
    if (type === 'phonenumber') {
      if (textValue.length > 13) return;
      onChange(
        textValue
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`),
      );
      return;
    }
    onChange(textValue);
  };
  return (
    <View style={essentialInputStyles.container}>
      <View style={essentialInputStyles.phoneInputContainer}>
        <Text style={{ ...essentialInputStyles.label, width: clacWidth }}>
          {label}
        </Text>
        <View>
          <TextInput
            value={value}
            maxLength={maxLength}
            keyboardType={keyboardType}
            secureTextEntry={type === 'password'}
            style={{
              ...essentialInputStyles.inputContainer,
              width: clacWidth,
              color: validation(value) ? colors.error : colors.grey,
              borderColor: validation(value) ? colors.error : colors.grey,
            }}
            onChangeText={(textValue: string) =>
              handleChangeText(textValue, setValue)
            }
            {...rest}
          />
          <ErrorText width={clacWidth} validation={validation} value={value} />
        </View>
      </View>
      {children}
    </View>
  );
};

export default EssentialInput;
