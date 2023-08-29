import { useQueryClient } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import queryKeys from 'constants/queryKeys';
import MENT_USER from 'constants/user/userConstants';
import useDialog from 'hooks/app/useDialog';
import {
  useMyInfo,
  useUploadImage,
  useUploadProfileImage,
} from 'hooks/queries/user';
import { S3UploadServiceRequestDto } from 'models/user/request/S3UploadServiceRequestDto';
import { useState } from 'react';
import { Image, Platform, Pressable, View } from 'react-native';
import { openImagePicker } from 'services/ImageCropPicker';
import { ApiErrorResponse } from 'types/ApiResponse';
import userProfileImageButtonStyles from './UserProfileImageButton.style';

const UserProfileImageButton = () => {
  const { data: userInfo } = useMyInfo();
  const { openDialog } = useDialog();
  const queryClient = useQueryClient();
  const PROFILE_IMAGE_COUNT = 1;
  const [profileImage, setProfileImage] = useState<string | undefined>(
    userInfo?.userInfo.profileImageUrl,
  );
  const handleImageUploadSuccessCallback = () => {
    queryClient.invalidateQueries(queryKeys.userKeys.myInfo);
  };

  const handleImageUploadErrorCallback = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? MENT_USER.ERROR.SERVER_IMAGE_ERROR,
    });
    setProfileImage(undefined);
  };
  const { mutateAsync: uploadImage } = useUploadImage(() => {
    return false;
  }, handleImageUploadErrorCallback);

  const { mutateAsync: uploadProfileImage } = useUploadProfileImage(
    handleImageUploadSuccessCallback,
    handleImageUploadErrorCallback,
  );

  const handleProfilePress = async () => {
    const selectedImages = await openImagePicker(PROFILE_IMAGE_COUNT);
    const imageFormData = new FormData();
    if (selectedImages.length > 1 && Platform.OS === 'android') {
      openDialog({
        type: 'validate',
        text: MENT_USER.ERROR.IMAGE_OVERFLOW,
      });
      return;
    }
    setProfileImage(selectedImages[0].path);
    const uploadFile = {
      name: `${userInfo?.userInfo.nickname}_${new Date().getTime()}.png`,
      type: 'image/png',
      uri: selectedImages[0].path,
    } as unknown as Blob;

    imageFormData.append('multipartFile', uploadFile);

    const imageFormDto: S3UploadServiceRequestDto = {
      multipartFile: imageFormData,
    };

    const imageUrl = await uploadImage(imageFormDto);
    await uploadProfileImage({ profileUrl: imageUrl.data.imgUrl });
  };

  return (
    <View style={userProfileImageButtonStyles.profileContainer}>
      <View style={userProfileImageButtonStyles.relativeContainer}>
        <Pressable
          style={userProfileImageButtonStyles.userProfileContainer}
          onPress={handleProfilePress}
        >
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={userProfileImageButtonStyles.userProfileImage}
            />
          ) : (
            <Icon
              name="IconUser"
              size={80}
              fill="grey"
              style={userProfileImageButtonStyles.userProfileNoneImage}
            />
          )}
        </Pressable>
        <Icon
          style={userProfileImageButtonStyles.pencilPosition}
          name="IconPencilCircle"
          size={25}
          fill="grey"
        />
      </View>
    </View>
  );
};

export default UserProfileImageButton;
