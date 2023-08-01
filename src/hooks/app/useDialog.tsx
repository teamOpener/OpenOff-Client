import { useMemo, useState } from 'react';
import Dialog from 'types/apps/dialog';

const useDialog = () => {
  const [dialog, setDialog] = useState<Dialog>({
    type: 'success',
    text: '',
    isShow: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    callback: () => {},
  });

  const openDialog = (text: string, type: string, callback?: () => void) => {
    if (!callback) {
      setDialog({
        text,
        type,
        isShow: true,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        callback: () => {},
      });
      return;
    }
    setDialog({
      text,
      type,
      isShow: true,
      callback,
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
