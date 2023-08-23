import { EventStaffInfoResponseDto } from 'models/ledger/response/EventStaffInfoResponseDto';
import { SearchNicknameResponseDto } from 'models/user/response/SearchNicknameResponseDto';

interface Props {
  staffs: EventStaffInfoResponseDto[];
}

const useUniqueName = ({ staffs }: Props) => {
  const findUniqueUser = (users: SearchNicknameResponseDto[]): string[] => {
    const staffNicknames = staffs.map(
      (eventStaffInfo) => eventStaffInfo.staffName,
    );

    const uniqueNicknamesArray = users
      .map((searchNicknameInfo) => searchNicknameInfo.nickname)
      .filter((nickname) => !staffNicknames.includes(nickname));

    return uniqueNicknamesArray;
  };

  return { findUniqueUser };
};

export default useUniqueName;
