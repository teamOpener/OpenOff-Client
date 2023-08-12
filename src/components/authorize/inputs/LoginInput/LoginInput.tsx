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
    <View>
      <Text variant="h4" style={loginInputStyles.inputTitle}>
        {label}
      </Text>
      <View>
        <TextInput
          value={value}
          placeholder={`${
            type === 'password' ? PASSWORD : EMAIL
          } 입력해주세요.`}
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
        <View style={loginInputStyles.validateStatus}>
          {validation(value) && value.length > 0 && type !== 'authnumber' && (
            <Text variant="body1" color="error">
              !
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default LoginInput;
