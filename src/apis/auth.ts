import fetcher from 'apis';
import ApiResponse from 'types/ApiResponse';
import { NormalSignInRequestDto } from 'models/auth/request/NormalSignInRequestDto';
import { TokenResponseDto } from 'models/auth/response/TokenResponseDto';

// eslint-disable-next-line import/prefer-default-export
export const normalLogin = async (
  data: NormalSignInRequestDto,
): Promise<ApiResponse<TokenResponseDto>> => {
  const response = await fetcher.post(`auth/login/normal`, data);
  return response.data;
};
