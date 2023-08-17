import { SearchNicknameResponseDto } from 'models/user/response/SearchNicknameResponseDto';

const extractUserIds = (users: SearchNicknameResponseDto[]) => {
  const userIds = users.map((item) => item.userId);
  return userIds;
};

export default extractUserIds;
