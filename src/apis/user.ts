import fetcher from 'apis';
import NCPSmsInfoRequestDto from 'models/user/request/NCPSmsInfoRequestDto';
import { S3UploadServiceRequestDto } from 'models/user/request/S3UploadServiceRequestDto';
import UserFcmTokenUploadRequestDto from 'models/user/request/UserFcmTokenUploadRequestDto';
import { SearchNicknameRequestDto } from 'models/user/request/SearchNicknameRequestDto';
import UserOnboardingRequestDto from 'models/user/request/UserOnboardingRequestDto';
import UserProfileUploadRequestDto from 'models/user/request/UserProfileUploadRequestDto';
import UserSmsCheckRequestDto from 'models/user/request/UserSmsCheckRequestDto';
import { S3UploadServiceResponseDto } from 'models/user/response/S3UploadServiceResponseDto';
import { SearchNicknameResponseDto } from 'models/user/response/SearchNicknameResponseDto';
import UserTotalInfoResponseDto from 'models/user/response/UserTotalInfoResponseDto';
import { ApiResponse } from 'types/ApiResponse';

export const getMyInfo = async (): Promise<
  ApiResponse<UserTotalInfoResponseDto>
> => {
  const response = await fetcher.get('user/my/info');
  return response.data;
};

export const sendSms = async (
  data: NCPSmsInfoRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.post(`user/sms`, data);
  return response.data;
};

export const checkSms = async (
  data: UserSmsCheckRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.patch(`user/sms`, data);
  return response.data;
};

export const updateOnBoarding = async (
  data: UserOnboardingRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.patch(`user/onboarding`, data);
  return response.data;
};

export const uploadImage = async (
  data: S3UploadServiceRequestDto,
): Promise<ApiResponse<S3UploadServiceResponseDto>> => {
  const response = await fetcher.post(
    `/user/image/upload`,
    data.multipartFile,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const uploadImages = async (
  data: FormData[],
): Promise<ApiResponse<S3UploadServiceResponseDto>> => {
  const response = await fetcher.post(`/user/image/uploads`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const permitAlert = async (data: UserFcmTokenUploadRequestDto) => {
  const response = await fetcher.post(`/user/permit/alert`, data);
  return response.data;
};

export const uploadProfileImage = async (
  data: UserProfileUploadRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.patch(`/user/upload/profile`, data);
  return response.data;
};

export const findUserByNickname = async (
  params: SearchNicknameRequestDto,
): Promise<ApiResponse<SearchNicknameResponseDto[]>> => {
  const response = await fetcher.get(`/user/search/nickname`, { params });
  return response.data;
};

export const withdrawal = async (): Promise<ApiResponse> => {
  const response = await fetcher.delete('/user/withdrawal');
  return response.data;
};
