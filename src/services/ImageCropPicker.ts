import i18n from 'locales';
import ImagePicker, { Image } from 'react-native-image-crop-picker';

const cropperOptions = {
  cropping: true,
  cropperStatusBarColor: 'black',
  cropperToolbarColor: 'black',
  cropperToolbarWidgetColor: 'white',
  cropperCancelText: i18n.t('cancel'),
  cropperChooseText: i18n.t('choose'),
};

export const openImagePicker = async (maxNumber: number): Promise<Image[]> => {
  try {
    const images = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      maxFiles: maxNumber,
      mediaType: 'photo',
      includeBase64: true,
    });

    return images;
  } catch (err) {
    // TODO: Handle error
    console.warn(err);
    throw err;
  }
};

export const openImageCropper = async (
  imagePath: string,
  width: number,
  height: number,
): Promise<Image> => {
  try {
    const croppedImage: Image = await ImagePicker.openCropper({
      path: imagePath,
      width,
      height,
      freeStyleCropEnabled: true,
      includeBase64: true,
      mediaType: 'photo',
      ...cropperOptions,
    });

    return croppedImage;
  } catch (err) {
    // TODO: Handle error
    console.warn(err);
    throw err;
  }
};
