import fetcher from 'apis';
import AddInterestRequestDto from 'models/field/request/AddInterestRequestDto';
import { ApiResponse } from 'types/ApiResponse';

// eslint-disable-next-line import/prefer-default-export
export const updateInterestField = async (
  data: AddInterestRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.post(`interest/save`, data);
  return response.data;
};
