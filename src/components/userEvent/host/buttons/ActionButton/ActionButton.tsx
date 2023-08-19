import Text from 'components/common/Text/Text';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import actionButtonStyles from './ActionButton.style';

interface Props extends TouchableOpacityProps {
  label: string;
  disabled?: boolean;
}

const ActionButton = ({ label, disabled = false, style, ...rest }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        actionButtonStyles.container,
        style,
        disabled && actionButtonStyles.container,
      ]}
      disabled={disabled}
      {...rest}
    >
      <Text style={actionButtonStyles.labelText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
