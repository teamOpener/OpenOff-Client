import { Image, Platform, TouchableOpacity, View } from 'react-native';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { requestSinglePermission } from 'services/permission';
import { PERMISSIONS } from 'react-native-permissions';
import { ImageBuilder } from 'types/openEvent/EventForm';
import imageButtonStyles from './ImageButton.style';
import openEventStyles from '../OpenEvent.style';

interface Props {
  imageBuilder?: ImageBuilder;
  isMain?: boolean;
  hasError?: boolean;
  onPress: () => void;
  onDelete?: () => void;
}

const ImageButton = ({
  imageBuilder,
  isMain = false,
  hasError = false,
  onPress,
  onDelete,
}: Props) => {
  const handlePress = async (callback: () => void) => {
    if (imageBuilder) {
      return;
    }

    if (Platform.OS === 'android') {
      await requestSinglePermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    } else if (Platform.OS === 'ios') {
      await requestSinglePermission(PERMISSIONS.IOS.PHOTO_LIBRARY);
    }
    // TODO: 권한 비허용시 setting으로

    callback();
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          openEventStyles.textWrapper,
          imageButtonStyles.container,
          hasError && imageButtonStyles.errorContainer,
        ]}
        activeOpacity={imageBuilder ? 1 : 0.6}
        onPress={() => handlePress(onPress)}
      >
        {imageBuilder ? (
          <Image
            source={{ uri: imageBuilder.localImage.path }}
            style={imageButtonStyles.image}
          />
        ) : (
          <View style={imageButtonStyles.cameraWrapper}>
            <Icon name="IconCamera" fill="grey" size={17} />
            <View style={imageButtonStyles.plusWrapper}>
              <Icon name="IconPlus" size={6} fill="darkGrey" />
            </View>
          </View>
        )}

        {isMain && (
          <View style={imageButtonStyles.primaryLabel}>
            <Text style={imageButtonStyles.primaryLabelText}>대표</Text>
          </View>
        )}
      </TouchableOpacity>

      {imageBuilder && (
        <TouchableOpacity
          style={imageButtonStyles.exitWrapper}
          activeOpacity={0.6}
          onPress={onDelete}
        >
          <Icon name="IconExitCircle" fill="grey" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImageButton;
