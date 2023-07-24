import { TouchableOpacity, View } from 'react-native';
import Text from '../Text/Text';
import fixedButtonStyles from './FixedButton.style';

interface Props {
  label: string;
  disabled?: boolean;
  onPress: () => void;
}

const FixedButton = ({ label, disabled = false, onPress }: Props) => {
  return (
    <View style={fixedButtonStyles.container}>
      <TouchableOpacity
        style={[
          fixedButtonStyles.button,
          disabled && fixedButtonStyles.disabledButton,
        ]}
        activeOpacity={0.5}
        onPress={onPress}
      >
        <Text style={fixedButtonStyles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FixedButton;
