import { OpenEvent } from 'components/openEvent';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventConstants';
import { ScrollView, View } from 'react-native';
import Icon from 'components/common/Icon/Icon';
import { useOpenEventStore } from 'stores/OpenEventStore';
import { openImagePicker } from 'services/ImageCropPicker';
import { ImageBuilder } from 'types/openEvent/EventForm';
import StatusType from 'constants/status';
import MAX_POSTER from 'constants/event';
import uploadImageStyles from './UploadImage.style';

const UploadImage = () => {
  const {
    openEvent,
    setOpenEvent,
    openEventErrorMessage,
    setOpenEventErrorMessage,
  } = useOpenEventStore();
  const { imageBuilders } = openEvent;
  const { imageUrls: hasError } = openEventErrorMessage;

  /**
   * 이미지 추가: 맨 뒤에 추가
   */
  const handlePress = async () => {
    const maxNumber = MAX_POSTER - imageBuilders.length;
    if (!maxNumber) {
      return;
    }
    const selectedImages = await openImagePicker(maxNumber);
    const imageBuildersToAdd: ImageBuilder[] = [];

    // android에서는 선택 개수 제한 불가
    const totalLength = imageBuilders.length + selectedImages.length;
    if (totalLength > MAX_POSTER) {
      setOpenEventErrorMessage({
        ...openEventErrorMessage,
        imageUrls: MENT_OPEN_EVENT.ERROR.MAX_IMAGE,
      });
      return;
    }

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
    setOpenEventErrorMessage({ ...openEventErrorMessage, imageUrls: null });
  };

  /**
   * 이미지 삭제
   */
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
      <OpenEvent.HelpText
        status={hasError ? StatusType.error : StatusType.default}
        content={
          openEventErrorMessage.imageUrls ?? MENT_OPEN_EVENT.HELP_TEXT.IMAGE
        }
      />

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
        {imageBuilders.length < MAX_POSTER && (
          <OpenEvent.ImageButton hasError={!!hasError} onPress={handlePress} />
        )}
      </ScrollView>
    </View>
  );
};

export default UploadImage;
