import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Text from '../Text/Text';
import fixedButtonStyles from './FixedButton.style';

interface Props extends TouchableOpacityProps {
  label: string;
}

const FixedButton = ({ label, disabled = false, style, ...rest }: Props) => {
  return (
    <View style={fixedButtonStyles.container}>
      <TouchableOpacity
        style={[
          fixedButtonStyles.button,
          disabled && fixedButtonStyles.disabledButton,
          style,
        ]}
        activeOpacity={0.8}
        {...rest}
      >
        <Text style={fixedButtonStyles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FixedButton;
