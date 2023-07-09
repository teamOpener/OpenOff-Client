import { TouchableOpacity } from 'react-native';
import { colors } from 'styles/theme';
import Text from '../../../common/Text/Text';
import socialLoginButtonStyles from './SocialLoginButton.style';

interface Props {
  label: string;
  color: string;
  handlePress: () => void;
}

const SocialLoginButton = ({ label, color, handlePress }: Props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ ...socialLoginButtonStyles.container, backgroundColor: color }}
    >
      <Text color="black" style={{ fontSize: 8 }} variant="caption">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default SocialLoginButton;
