import { useMemo, useState } from 'react';
import {
  CommonDialog,
  ConfirmDialog,
  DialogType,
  OpenDialog,
} from 'types/apps/dialog';

const useDialog = () => {
  const [dialog, setDialog] = useState<CommonDialog>({
    type: 'success',
    text: '',
    isShow: false,
    contents: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    callback: () => {},
    closeText: '닫기',
  });

  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog>({
    text: '',
    isShow: false,
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
    contents = '',
    applyText = '적용',
    closeText = '닫기',
  }: OpenDialog) => {
    switch (type) {
      case 'success':
        return setDialog({
          text,
          type,
          isShow: true,
          contents,
          callback,
          closeText,
        });
      case 'validate':
        return setDialog({
          text,
          type,
          isShow: true,
          contents,
          callback,
          closeText,
        });
      case 'confirm':
        return setConfirmDialog({
          text,
          isShow: true,
          apply,
          applyText,
          closeText,
        });
      default:
        return () => {
          return false;
        };
    }
  };

  const closeDialog = (type: DialogType) => {
    switch (type) {
      case 'success':
        dialog.callback();
        return setDialog({
          type: 'success',
          text: '',
          isShow: false,
          contents: '',
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          callback: () => {},
          closeText: '닫기',
        });
      case 'validate':
        dialog.callback();
        return setDialog({
          type: 'validate',
          text: '',
          isShow: false,
          contents: '',
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          callback: () => {},
          closeText: '닫기',
        });
      case 'confirm':
        return setConfirmDialog({
          text: '',
          isShow: false,
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          apply: () => {},
          applyText: '적용',
          closeText: '닫기',
        });
      default:
        return () => {
          return false;
        };
    }
  };

  const dialogContextValue = useMemo(() => {
    return { openDialog, closeDialog };
  }, [!!dialog.isShow, !!confirmDialog.isShow]);

  return {
    dialogContextValue,
    dialog,
    confirmDialog,
    closeDialog,
    openDialog,
  };
};

export default useDialog;
