import ErrorText from 'components/authorize/texts/ErrorText/ErrorText';
import Text from 'components/common/Text/Text';
import { Dispatch, SetStateAction } from 'react';
import { TextInput, View } from 'react-native';
import { colors } from 'styles/theme';
import loginInputStyles from './LoginInput.style';

interface Props {
  label: string;
  value: string;
  type: string;
  setValue: Dispatch<SetStateAction<string>>;
  validation: (value: string) => string | undefined;
}

const LoginInput = ({ label, value, setValue, type, validation }: Props) => {
  const PASSWORD = '비밀번호를';
  const EMAIL = '이메일을';
  return (
    <View style={loginInputStyles.container}>
      <Text variant="h4" style={loginInputStyles.inputTitle}>
        {label}
      </Text>
      <TextInput
        value={value}
        placeholder={`${type === 'password' ? PASSWORD : EMAIL} 입력해주세요.`}
        placeholderTextColor={colors.grey}
        style={{
          ...loginInputStyles.input,
          color: validation(value) ? colors.error : colors.grey,
          borderColor: validation(value) ? colors.error : colors.grey,
        }}
        secureTextEntry={type === 'password'}
        onChangeText={(text: string) => {
          setValue(text);
        }}
      />
      <ErrorText validation={validation} value={value} />
    </View>
  );
};

export default LoginInput;
