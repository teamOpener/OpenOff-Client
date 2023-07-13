import Icon from 'components/common/Icon/Icon';
import { TouchableOpacity } from 'react-native';
import myCoordinateButtonStyles from './MyCoordinateButton.style';

interface Props {
  handlePress: () => void;
}

const MyCoordinateButton = ({ handlePress }: Props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={myCoordinateButtonStyles.container}
    >
      <Icon name="IconMyCoordinate" size={40} fill="main" />
    </TouchableOpacity>
  );
};

export default MyCoordinateButton;
