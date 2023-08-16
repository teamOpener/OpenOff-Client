import Icon from 'components/common/Icon/Icon';
import { TouchableOpacity } from 'react-native';
import backButtonStyles from './BackButton.style';

interface Props {
  callback: () => void;
}

const BackEventButton = ({ callback }: Props) => {
  const handlePress = () => {
    callback();
  };

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

export default BackEventButton;
