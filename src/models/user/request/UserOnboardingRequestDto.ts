import { Gender } from 'types/join';

interface UserOnboardingRequestDto {
  nickname: string;
  username: string;
  gender: Gender;
  year: number;
  month: number;
  day: number;
}

export default UserOnboardingRequestDto;
