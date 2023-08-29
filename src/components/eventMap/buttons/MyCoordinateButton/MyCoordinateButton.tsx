import Icon from 'components/common/Icon/Icon';
import { Dimensions, TouchableOpacity } from 'react-native';
import myCoordinateButtonStyles from './MyCoordinateButton.style';

interface Props {
  handlePress: () => void;
  bottomSheetChecker: number;
}

const MyCoordinateButton = ({ handlePress, bottomSheetChecker }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...myCoordinateButtonStyles.container,
        bottom:
          bottomSheetChecker === 1
            ? Dimensions.get('window').height / 2 + 30
            : 120,
      }}
    >
      <Icon name="IconMyCoordinate" size={38} fill="black" />
    </TouchableOpacity>
  );
};

export default MyCoordinateButton;
