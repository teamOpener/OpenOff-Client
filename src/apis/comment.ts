import fetcher from 'apis';
import { ChildCommentInfoRequestDto } from 'models/comment/request/ChildCommentInfoRequestDto';
import { ChildCommentWriteRequestDto } from 'models/comment/request/ChildCommentWriteRequestDto';
import { CommentReportRequestDto } from 'models/comment/request/CommentReportRequestDto';
import { ParentCommentInfoRequestDto } from 'models/comment/request/ParentCommentInfoRequestDto';
import { ParentCommentWriteRequestDto } from 'models/comment/request/ParentCommentWriteRequestDto';
import { ChildCommentInfoResponseDto } from 'models/comment/response/ChildCommentInfoResponseDto';
import { ChildCommentWriteResponseDto } from 'models/comment/response/ChildCommentWriteResponseDto';
import { ParentCommentInfoResponseDto } from 'models/comment/response/ParentCommentInfoResponseDto';
import { ParentCommentWriteResponseDto } from 'models/comment/response/ParentCommentWriteResponseDto';
import { ApiResponse, InfiniteScrollApiResponse } from 'types/ApiResponse';

export const getParentComments = async (
  params: ParentCommentInfoRequestDto,
): Promise<InfiniteScrollApiResponse<ParentCommentInfoResponseDto>> => {
  const response = await fetcher.get(`/comment/${params.eventInfoId}`, {
    params: params.commentId,
  });
  return response.data;
};

export const getChildComments = async (
  params: ChildCommentInfoRequestDto,
): Promise<ApiResponse<ChildCommentInfoResponseDto[]>> => {
  const response = await fetcher.get(
    `/comment/child/${params.eventInfoId}/${params.commentId}`,
  );
  return response.data;
};

export const postParentComment = async (
  data: ParentCommentWriteRequestDto,
): Promise<ApiResponse<ParentCommentWriteResponseDto>> => {
  const response = await fetcher.post(`/comment`, data);
  return response.data;
};

export const postChildComment = async (
  data: ChildCommentWriteRequestDto,
): Promise<ApiResponse<ChildCommentWriteResponseDto>> => {
  const response = await fetcher.post(`/comment`, data);
  return response.data;
};

export const reportComment = async (
  params: CommentReportRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.get(`/comment/report/${params.commentId}`);
  return response.data;
};
