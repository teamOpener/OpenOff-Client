import Icon from 'components/common/Icon/Icon';
import { TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import useNavigator from 'hooks/navigator/useNavigator';
import { AuthorizeMenu } from 'constants/menu';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from 'types/apps/menu';
import backToLoginButtonStyles from './BackToHomeButton.style';

interface Props {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const BackToHomeButton = ({ setIsLogin }: Props) => {
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
