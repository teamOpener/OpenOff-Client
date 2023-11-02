import i18n from 'locales';
import { TouchableOpacity } from 'react-native';
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
      activeOpacity={0.7}
      onPress={handlePress}
      style={{
        ...loginButtonStyles.container,
        backgroundColor: isActive ? colors.main : colors.darkGrey,
      }}
    >
      <Text color={isActive ? 'white' : 'grey'} variant="h4">
        {i18n.t('authorize.login')}
      </Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
