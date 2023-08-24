import fetcher from 'apis';
import { ApiResponse } from 'types/ApiResponse';

const getBannerImages = async (): Promise<ApiResponse<string[]>> => {
  const response = await fetcher.get(`/banner`);
  return response.data;
};

export default getBannerImages;
