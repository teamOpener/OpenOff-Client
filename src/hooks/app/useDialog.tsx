import { useMemo, useState } from 'react';
import { Dialog, OpenDialog } from 'types/apps/dialog';

const useDialog = () => {
  const [dialog, setDialog] = useState<Dialog>({
    type: 'success',
    text: '',
    isShow: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    callback: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    apply: () => {},
    applyText: '적용',
    closeText: '닫기',
  });

  const openDialog = ({
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
    setDialog({
      text,
      type,
      isShow: true,
      callback,
      apply,
      applyText,
      closeText,
    });
  };

  const closeDialog = () => {
    dialog.callback();
    setDialog({
      type: 'success',
      text: '',
      isShow: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      callback: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      apply: () => {},
      applyText: '적용',
      closeText: '닫기',
    });
  };

  const dialogContextValue = useMemo(() => {
    return { openDialog, closeDialog };
  }, [!!dialog.isShow]);

  return {
    dialogContextValue,
    dialog,
    closeDialog,
    openDialog,
  };
};

export default useDialog;
