import fetcher from 'apis';
import { ApiResponse } from 'types/ApiResponse';
import { EventLadgerTotalStatusRequestDto } from 'models/ledger/request/EventLadgerTotalStatusRequestDto';
import { EventLadgerTotalStatusResponseDto } from 'models/ledger/response/EventLadgerTotalStatusResponseDto';

// eslint-disable-next-line import/prefer-default-export
export const getLedgerStatus = async (
  params: EventLadgerTotalStatusRequestDto,
): Promise<ApiResponse<EventLadgerTotalStatusResponseDto>> => {
  const response = await fetcher.get(`/ladger/status`, { params });
  return response.data;
};
