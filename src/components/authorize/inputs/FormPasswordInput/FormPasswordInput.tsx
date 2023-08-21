import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Platform, TextInput, View } from 'react-native';
import { colors } from 'styles/theme';
import { PasswordValue } from 'types/join';
import formPasswordInputStyles from './FormPasswordInput.style';

interface Props {
  name: 'password' | 'passwordCheck';
  label: string;
  validate: (value: string) => string | undefined;
  errors: FieldErrors<PasswordValue>;
  control: Control<PasswordValue, any>;
  requiredMessage: string;
}

const FormPasswordInput = ({
  name,
  label,
  validate,
  errors,
  control,
  requiredMessage,
}: Props) => {
  const calcFontSize = (calcValidate: string | undefined) => {
    if (!calcValidate) return 11;
    return calcValidate.length > 20 ? 10 : 11;
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: (value) => validate(value),
        required: requiredMessage,
      }}
      render={({ field: { onChange, value } }) => (
        <View style={formPasswordInputStyles.container}>
          <Text color="grey" style={formPasswordInputStyles.label}>
            {label}
          </Text>

          <View style={formPasswordInputStyles.phoneInputRow}>
            <View style={formPasswordInputStyles.inputAbsoluteContainer}>
              <TextInput
                id={name}
                value={value}
                maxLength={20}
                secureTextEntry
                style={{
                  ...formPasswordInputStyles.inputContainer,
                  color: errors[name] ? colors.error : colors.white,
                  borderColor: errors[name] ? colors.error : colors.darkGrey,
                }}
                onChangeText={onChange}
              />

              <View style={formPasswordInputStyles.helpTextContainer}>
                <View>
                  {errors[name]?.message ? (
                    <Text
                      color="error"
                      variant="caption"
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        ...formPasswordInputStyles.errorText,
                        fontSize:
                          Platform.OS === 'android'
                            ? 11
                            : calcFontSize(String(errors[name]?.message)),
                      }}
                    >
                      {String(errors[name]?.message)}
                    </Text>
                  ) : null}
                </View>
              </View>

              <View style={formPasswordInputStyles.validateStatus}>
                {errors[name] && value && (
                  <Text variant="body1" color="error">
                    !
                  </Text>
                )}
                {!errors[name] && value && (
                  <Icon name="IconCheck" size={20} fill="green" />
                )}
              </View>
            </View>
          </View>

          <Spacing height={5} />
        </View>
      )}
    />
  );
};

export default FormPasswordInput;
