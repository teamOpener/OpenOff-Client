import fetcher from 'apis';
import AddInterestRequestDto from 'models/field/request/AddInterestRequestDto';
import { InterestInfoResponseDto } from 'models/interest/response/InterestInfoResponseDto';
import { ApiResponse } from 'types/ApiResponse';

export const updateInterestField = async (
  data: AddInterestRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.post(`interest/save`, data);
  return response.data;
};

export const getInterestFieldLists = async (): Promise<
  ApiResponse<InterestInfoResponseDto[]>
> => {
  const response = await fetcher.get(`interest/info`);
  return response.data;
};
