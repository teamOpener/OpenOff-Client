import { useMemo, useState } from 'react';
import Dialog from 'types/apps/dialog';

const useDialog = () => {
  const [dialog, setDialog] = useState<Dialog>({
    type: 'success',
    text: '',
    isShow: false,
  });

  const openDialog = (text: string, type: string) => {
    setDialog({
      text,
      type,
      isShow: true,
    });
  };

  const closeDialog = (callback?: () => void) => {
    setDialog({
      type: 'success',
      text: '',
      isShow: false,
    });
    if (!callback) {
      return;
    }
    callback();
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
