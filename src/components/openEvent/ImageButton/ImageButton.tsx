import { TouchableOpacity, View } from 'react-native';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import imageButtonStyles from './ImageButton.style';
import openEventStyles from '../OpenEvent.style';

const ImageButton = () => {
  return (
    <View>
      <TouchableOpacity
        style={[openEventStyles.textWrapper, imageButtonStyles.container]}
        activeOpacity={0.6}
      >
        <View style={imageButtonStyles.cameraWrapper}>
          <Icon name="IconCamera" fill="grey" size={17} />
          <View style={imageButtonStyles.plusWrapper}>
            <Icon name="IconPlus" size={6} fill="darkGrey" />
          </View>
        </View>

        <View style={imageButtonStyles.primaryLabel}>
          <Text>대표</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={imageButtonStyles.exitWrapper}
        activeOpacity={0.6}
      >
        <Icon name="IconExitCircle" fill="grey" />
      </TouchableOpacity>
    </View>
  );
};

export default ImageButton;
