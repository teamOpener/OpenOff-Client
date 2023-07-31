import { SelectUserAlertResponse } from 'models/alert/response/SelectUserAlertResponse.Dto';

const alertList: SelectUserAlertResponse[] = [
  {
    title: '이벤트 날짜가 하루 전으로 다가왔어요!',
    alertType: 'EA',
    regDate: '2023-07-30T13:20:00',
  },
  {
    title: '이벤트 신청 마감 하루 전이에요!',
    alertType: 'EA',
    regDate: '2023-07-12T13:20:00',
  },
  {
    title: '내가 남긴 문의에 댓글이 달렸어요.',
    alertType: 'CA',
    regDate: '2023-07-28T13:20:00',
  },
];

export default alertList;
