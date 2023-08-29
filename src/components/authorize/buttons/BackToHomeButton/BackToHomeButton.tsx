import Icon from 'components/common/Icon/Icon';
import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useAuthorizeStore } from 'stores/Authorize';
import backToLoginButtonStyles from './BackToHomeButton.style';

const BackToHomeButton = () => {
  const { setIsLogin } = useAuthorizeStore();
  const handlePress = useCallback(() => {
    setIsLogin(true);
  }, []);

  return (
    <TouchableOpacity
      style={backToLoginButtonStyles.container}
      activeOpacity={0.5}
      onPress={handlePress}
    >
      <Icon name="IconArrowLeft" fill="white" />
    </TouchableOpacity>
  );
};

export default BackToHomeButton;
