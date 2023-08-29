import { debounce } from 'lodash';
import { TouchableOpacity } from 'react-native';
import { useCallback } from 'react';
import useNavigator from 'hooks/navigator/useNavigator';
import Icon from 'components/common/Icon/Icon';
import exitButtonStyles from './ExitButton.style';

const ExitButton = () => {
  const { stackNavigation } = useNavigator();

  const handlePress = useCallback(
    debounce(() => {
      stackNavigation.goBack();
    }, 5),
    [stackNavigation],
  );
  return (
    <TouchableOpacity
      style={exitButtonStyles.container}
      activeOpacity={0.5}
      onPress={handlePress}
    >
      <Icon name="IconExit" fill="grey" size={20} />
    </TouchableOpacity>
  );
};

export default ExitButton;
