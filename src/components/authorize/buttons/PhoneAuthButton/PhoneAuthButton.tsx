import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from '../../../common/Text/Text';
import phoneAuthButtonStyles from './PhoneAuthButton.style';

interface Props {
  label: string;
  active: boolean;
  handlePress: () => void;
}

const PhoneAuthButton = ({ label, active, handlePress }: Props) => {
  const hadleAuthPress = () => {
    if (!active) return;
    handlePress();
  };
  return (
    <TouchableOpacity
      style={
        active
          ? phoneAuthButtonStyles.activeButton
          : phoneAuthButtonStyles.nonActiveButton
      }
      onPress={hadleAuthPress}
    >
      <Text variant="caption" color={active ? 'white' : 'grey'}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default PhoneAuthButton;
