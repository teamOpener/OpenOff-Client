import { createContext } from 'react';
import { DialogType, OpenDialog } from 'types/apps/dialog';

const DialogContext = createContext({
  /**
   * 다이얼로그 오픈 함수
   * @constructor
   * @property text - 다이얼로그 내용
   * @property type - 다이얼로그 타입
   * @property callback - 닫기 클릭시 실행되는 콜백함수
   * @property apply - 적용 클릭시 실행되는 함수
   * @property applyText - 적용버튼 내용
   * @property closeText - 닫기버튼 내용
   */
  openDialog: ({
    text,
    type,
    callback = () => {
      return false;
    },
    apply = () => {
      return false;
    },
    applyText = '적용',
    closeText = '닫기',
  }: OpenDialog) => {
    apply();
    callback();
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeDialog: (type: DialogType) => {},
});
export default DialogContext;
