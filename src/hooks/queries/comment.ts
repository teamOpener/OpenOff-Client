import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import queryKeys from 'constants/queryKeys';
import { ApiErrorResponse } from 'types/ApiResponse';
import {
  getChildComments,
  getParentComments,
  postChildComment,
  postParentComment,
  reportComment,
} from 'apis/comment';
import { ParentCommentInfoRequestDto } from 'models/comment/request/ParentCommentInfoRequestDto';
import { ParentCommentWriteRequestDto } from 'models/comment/request/ParentCommentWriteRequestDto';
import { ChildCommentInfoRequestDto } from 'models/comment/request/ChildCommentInfoRequestDto';
import { ChildCommentWriteRequestDto } from 'models/comment/request/ChildCommentWriteRequestDto';
import { CommentReportRequestDto } from 'models/comment/request/CommentReportRequestDto';

export const useParentComments = (params: ParentCommentInfoRequestDto) => {
  return useInfiniteQuery(
    [...queryKeys.commentKeys.parentCommentsByEventInfoId(params.eventInfoId)],
    () => getParentComments(params),
    {
      suspense: false,
    },
  );
};

export const useChildComments = (params: ChildCommentInfoRequestDto) => {
  return useQuery(
    [
      ...queryKeys.commentKeys.childCommentsByEventInfoId(
        params.eventInfoId,
        params.commentId,
      ),
    ],
    () => getChildComments(params),
    {
      select: (data) => data.data,
      suspense: false,
    },
  );
};

export const usePostParentComment = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    (data: ParentCommentWriteRequestDto) => postParentComment(data),
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};

export const usePostChildComment = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    (data: ChildCommentWriteRequestDto) => postChildComment(data),
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};

export const useReportComment = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((data: CommentReportRequestDto) => reportComment(data), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
  });
};
