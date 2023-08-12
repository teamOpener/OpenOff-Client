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
      activeOpacity={0.8}
      style={[
        phoneAuthButtonStyles.buttonWrapper,
        active
          ? phoneAuthButtonStyles.activeButton
          : phoneAuthButtonStyles.nonActiveButton,
      ]}
      onPress={hadleAuthPress}
    >
      <Text
        color={active ? 'white' : 'grey'}
        style={phoneAuthButtonStyles.text}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default PhoneAuthButton;
