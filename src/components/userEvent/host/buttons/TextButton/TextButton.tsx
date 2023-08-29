import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Text from 'components/common/Text/Text';
import textButtonStyles from './TextButton.style';

interface Props extends TouchableOpacityProps {
  label: string;
}

const TextButton = ({ label, style, ...rest }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[textButtonStyles.container, style]}
      {...rest}
    >
      <Text style={textButtonStyles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
