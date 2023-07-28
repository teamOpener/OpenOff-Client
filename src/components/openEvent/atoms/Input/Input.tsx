import { View, TextInput, TextInputProps } from 'react-native';
import StatusType from 'constants/status';
import inputStyles from './Input.style';
import openEventStyles from '../OpenEvent.style';
import HelpText from '../HelpText/HelpText';

interface Props extends TextInputProps {
  status?: StatusType;
  helpText?: string;
  disabled?: boolean;
}

const Input = ({
  status = StatusType.default,
  helpText,
  style,
  disabled = false,
  ...rest
}: Props) => {
  return (
    <View style={inputStyles.container}>
      <TextInput
        style={[
          openEventStyles.textWrapper,
          inputStyles.text,
          status === StatusType.error && inputStyles.errorTextWrapper,
          disabled && inputStyles.disabledTextWrapper,
          { ...(style as object) },
        ]}
        placeholderTextColor="#A4A4A4"
        {...rest}
      />
      {helpText && <HelpText content={helpText} status={status} />}
    </View>
  );
};

export default Input;
