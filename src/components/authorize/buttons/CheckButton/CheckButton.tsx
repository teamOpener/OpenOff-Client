import { Image, View, TouchableOpacity } from 'react-native';
import Text from 'components/common/Text/Text';
import checkButtonStyles from './CheckButton.style';

interface Props {
  value: boolean;
  handlePress: () => void;
  label: string;
  marginBottom?: number;
}

const CheckButton = ({
  value,
  handlePress,
  label,
  marginBottom = 0,
}: Props) => {
  return (
    <View style={{ ...checkButtonStyles.container, marginBottom }}>
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
              ? require('../../../../assets/images/check.png')
              : require('../../../../assets/images/nonCheck.png')
          }
        />
      </TouchableOpacity>
      <Text style={checkButtonStyles.checkButtonLabel}>{label}</Text>
    </View>
  );
};

export default CheckButton;
