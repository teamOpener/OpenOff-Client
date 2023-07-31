// import { UserInfoResponseDto } from 'models/user/response/UserInfoResponseDto';

export interface EventComment {
  id: number;
  //   eventInfo: EventInfo;
  // writer: UserInfoResponseDto;
  content: string;
  parent: EventComment;
  children: EventComment[];
}
