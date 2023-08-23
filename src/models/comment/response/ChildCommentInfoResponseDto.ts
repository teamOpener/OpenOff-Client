export interface ChildCommentInfoResponseDto {
  commentId: number;
  userId: string;
  nickname: string;
  content: string;
  createdAt: string;
  isStaff: boolean;
}
