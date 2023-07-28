import { OpenEvent } from 'components/openEvent';
import MENT_OPEN_EVENT from 'constants/openEvent';
import { ScrollView, View } from 'react-native';
import Icon from 'components/common/Icon/Icon';
import { useOpenEventStore } from 'stores/OpenEventStore';
import { openImagePicker } from 'services/ImageCropPicker';
import { ImageBuilder } from 'types/openEvent/EventBuilder';
import uploadImageStyles from './UploadImage.style';

const UploadImage = () => {
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();
  const { imageBuilders } = openEvent;

  /**
   * 맨 뒤에 추가
   */
  const handlePress = async () => {
    const maxNumber = 3 - imageBuilders.length;
    if (!maxNumber) {
      return;
    }
    const selectedImages = await openImagePicker(maxNumber);
    const imageBuildersToAdd: ImageBuilder[] = [];

    selectedImages.forEach((image) => {
      const temp: ImageBuilder = {
        localImage: image,
        uploadUrl: null,
        isMain: false,
      };
      imageBuildersToAdd.push(temp);
    });

    const original = imageBuilders;
    original.push(...imageBuildersToAdd);

    setOpenEvent({ ...openEvent, imageBuilders: original });
  };

  const handleDelete = (idx: number) => {
    const original = [...imageBuilders];

    if (idx >= 0 && idx < original.length) {
      original.splice(idx, 1);
      setOpenEvent({ ...openEvent, imageBuilders: original });
    }
  };

  return (
    <View>
      <View style={uploadImageStyles.titleWithIcon}>
        <OpenEvent.Label content={MENT_OPEN_EVENT.MAIN.IMAGE} />
        <Icon name="IconCamera" size={17} fill="grey" />
      </View>
      <OpenEvent.HelpText content={MENT_OPEN_EVENT.HELP_TEXT.IMAGE} />

      <ScrollView
        horizontal
        contentContainerStyle={uploadImageStyles.horizontalScrollView}
      >
        {imageBuilders.map((image, idx) => (
          <OpenEvent.ImageButton
            key={image.uploadUrl}
            isMain={!idx}
            imageBuilder={image}
            onPress={handlePress}
            onDelete={() => handleDelete(idx)}
          />
        ))}
        {imageBuilders.length < 3 && (
          <OpenEvent.ImageButton onPress={handlePress} />
        )}
      </ScrollView>
    </View>
  );
};

export default UploadImage;
