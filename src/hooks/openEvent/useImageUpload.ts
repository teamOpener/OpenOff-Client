import { useUploadImage } from 'hooks/queries/user';
import { ImageUrlList } from 'models/event/entity/ImageUrlList';
import { S3UploadServiceRequestDto } from 'models/user/request/S3UploadServiceRequestDto';
import { ImageBuilder } from 'types/openEvent/EventForm';

interface Props {
  imageBuilders: ImageBuilder[];
  successCallback: () => void;
  errorCallback: () => void;
}

const useImageUpload = ({
  imageBuilders,
  successCallback,
  errorCallback,
}: Props) => {
  const { mutateAsync: uploadImage, isLoading } = useUploadImage(
    successCallback,
    errorCallback,
  );

  const uploadImages = async (): Promise<ImageUrlList[]> => {
    const promises = imageBuilders.map(async (imageBuilder, idx) => {
      const imageFormData = new FormData();

      const uploadFile = {
        name: `${new Date().getTime()}.png`,
        type: 'image/png',
        uri: imageBuilder.localImage.path,
      } as unknown as Blob;

      imageFormData.append('multipartFile', uploadFile);

      const dto: S3UploadServiceRequestDto = {
        multipartFile: imageFormData,
      };

      const res = await uploadImage(dto);
      const s3Url = res.data.imgUrl;

      return {
        imageUrl: s3Url,
        isMain: idx === 0,
      };
    });

    const newImageUrlList: ImageUrlList[] = await Promise.all(promises);

    return newImageUrlList;
  };

  return { uploadImages, isLoading };
};

export default useImageUpload;
