import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from '../../../common/Text/Text';
import loginButtonStyles from './LoginButton.style';

interface Props {
  handlePress: () => void;
}

const LoginButton = ({ handlePress }: Props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={loginButtonStyles.container}
      hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
    >
      <Text color="grey" variant="h4">
        로그인
      </Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
