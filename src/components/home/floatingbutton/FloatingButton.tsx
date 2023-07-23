import { TouchableOpacity } from 'react-native';
import { useCallback } from 'react';
import Icon from 'components/common/Icon/Icon';
import { StackMenu } from 'constants/menu';
import useNavigator from 'hooks/navigator/useNavigator';
import floatingButtonStyles from './FloatingButton.style';

const FloatingButton = () => {
  const { stackNavigation } = useNavigator();

  const handlePress = useCallback(() => {
    stackNavigation.navigate(StackMenu.OpenEvent);
  }, [stackNavigation]);

  return (
    <TouchableOpacity
      style={floatingButtonStyles.container}
      activeOpacity={0.5}
      onPress={handlePress}
    >
      <Icon name="IconPlusCircle" size={53} fill="white" />
    </TouchableOpacity>
  );
};

export default FloatingButton;
