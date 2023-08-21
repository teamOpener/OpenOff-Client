import Text from 'components/common/Text/Text';
import { Platform, View } from 'react-native';
import errorTextStyles from './ErrorText.style';

interface Props {
  validation: (value: string) => string | undefined;
  value: string;
  width?: number;
}

const ErrorText = ({ validation, value, width = 350 }: Props) => {
  const calcFontSize = () => {
    const validate = validation(value);
    if (!validate) return 11;
    return validate.length > 20 ? 10 : 11;
  };

  return (
    <View>
      {validation(value) ? (
        <Text
          color="error"
          variant="caption"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...errorTextStyles.text,
            width,
            fontSize: Platform.OS === 'android' ? 11 : calcFontSize(),
          }}
        >
          {validation(value)}
        </Text>
      ) : null}
    </View>
  );
};

export default ErrorText;
