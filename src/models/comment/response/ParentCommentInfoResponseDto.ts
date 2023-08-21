export interface ParentCommentInfoResponseDto {
  commentId: number;
  userId: string;
  nickname: string;
  content: string;
  childCount: number;
  createdAt: string;
  isStaff: boolean;
}
