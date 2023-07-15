import { View } from 'react-native';
import Text from 'components/common/Text/Text';
import errorTextStyles from './ErrorText.style';

interface Props {
  validation: (value: string) => string | undefined;
  value: string;
  width?: number;
}

const ErrorText = ({ validation, value, width = 350 }: Props) => {
  return (
    <View>
      {validation(value) ? (
        <Text
          color="error"
          variant="caption"
          style={{ ...errorTextStyles.text, width }}
        >
          {validation(value)}
        </Text>
      ) : null}
    </View>
  );
};

export default ErrorText;
