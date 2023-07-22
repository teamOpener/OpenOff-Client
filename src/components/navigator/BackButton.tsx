import Icon from 'components/common/Icon/Icon';
import { TouchableOpacity } from 'react-native';
import { useCallback } from 'react';
import useNavigator from 'hooks/navigator/useNavigator';
import backButtonStyles from './BackButton.style';

const BackButton = () => {
  const { stackNavigation } = useNavigator();

  const handlePress = useCallback(() => {
    stackNavigation.goBack();
  }, [stackNavigation]);

  return (
    <TouchableOpacity
      style={backButtonStyles.container}
      activeOpacity={0.5}
      onPress={handlePress}
    >
      <Icon name="IconArrowLeft" fill="white" />
    </TouchableOpacity>
  );
};

export default BackButton;
