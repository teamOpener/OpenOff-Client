import { Image, Text, View, TouchableOpacity } from 'react-native';
import checkButtonStyles from './CheckButton.style';

interface Props {
  value: boolean;
  handlePress: () => void;
  label: string;
}

const CheckButton = ({ value, handlePress, label }: Props) => {
  return (
    <View style={checkButtonStyles.container}>
      <TouchableOpacity
        style={checkButtonStyles.checkContainer}
        onPress={() => {
          handlePress();
        }}
      >
        <Image
          style={checkButtonStyles.check}
          source={
            value
              ? // eslint-disable-next-line global-require
                require('../../../../assets/images/check.png')
              : // eslint-disable-next-line global-require
                require('../../../../assets/images/nonCheck.png')
          }
        />
      </TouchableOpacity>
      <Text style={checkButtonStyles.checkButtonLabel}>{label}</Text>
    </View>
  );
};

export default CheckButton;
