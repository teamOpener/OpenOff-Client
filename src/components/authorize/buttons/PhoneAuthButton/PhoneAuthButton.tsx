import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from '../../../common/Text/Text';
import phoneAuthButtonStyles from './PhoneAuthButton.style';

interface Props {
  label: string;
  active: boolean;
  handlePress: () => void;
}

const PhoneAuthButton = ({ label, active, handlePress }: Props) => {
  return (
    <View style={phoneAuthButtonStyles.container}>
      {active ? (
        <TouchableOpacity
          style={phoneAuthButtonStyles.activeButton}
          onPress={handlePress}
        >
          <Text variant="caption" color="white">
            {label}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={phoneAuthButtonStyles.nonActiveButton}>
          <Text variant="caption" color="grey">
            {label}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PhoneAuthButton;
