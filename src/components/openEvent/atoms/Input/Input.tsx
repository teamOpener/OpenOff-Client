import StatusType from 'constants/app/status';
import { TextInput, TextInputProps, View } from 'react-native';
import HelpText from '../HelpText/HelpText';
import openEventStyles from '../OpenEvent.style';
import inputStyles from './Input.style';

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
          inputStyles.textInputContainer,
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
