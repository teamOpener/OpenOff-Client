import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from 'styles/theme';
import Text from '../../../common/Text/Text';
import loginButtonStyles from './LoginButton.style';

interface Props {
  handlePress: () => void;
  isActive: boolean;
}

const LoginButton = ({ handlePress, isActive }: Props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        ...loginButtonStyles.container,
        backgroundColor: isActive ? colors.main : colors.darkGrey,
      }}
      hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
    >
      <Text color={isActive ? 'white' : 'grey'} variant="h4">
        로그인
      </Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
