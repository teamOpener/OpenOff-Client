/* eslint-disable @typescript-eslint/no-empty-function */
import { PropsWithChildren, useMemo, useState } from 'react';
import {
  CommonDialog,
  ConfirmDialog,
  DialogEnumType,
  OpenDialog,
} from 'types/apps/dialog';
import {
  DialogContext,
  confirmDialogInitialValue,
  dialogInitialValue,
} from './DialogContext';

const DialogProviders = ({ children }: PropsWithChildren) => {
  const [dialog, setDialog] = useState<CommonDialog>(dialogInitialValue);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog>(
    confirmDialogInitialValue,
  );

  const resetCommonDialog = () => {
    setDialog({
      text: '',
      type: DialogEnumType.Validate,
      isShow: false,
      contents: '',
      callback: () => {},
      closeText: '닫기',
    });
  };

  const resetConfirmDialog = () => {
    setConfirmDialog({
      text: '',
      isShow: false,
      apply: () => {},
      applyText: '적용',
      closeText: '닫기',
    });
  };

  const openDialog = ({
    text,
    type,
    callback = () => {},
    apply = () => {},
    contents = '',
    applyText = '적용',
    closeText = '닫기',
  }: OpenDialog) => {
    switch (type) {
      case DialogEnumType.Validate:
      case DialogEnumType.Success:
        setDialog({
          text,
          type,
          contents,
          callback,
          closeText,
          isShow: true,
        });
        break;
      case DialogEnumType.Confirm:
        setConfirmDialog({
          text,
          apply,
          applyText,
          closeText,
          isShow: true,
        });
        break;
      default:
        break;
    }
  };

  const closeDialog = (type: DialogEnumType) => {
    switch (type) {
      case DialogEnumType.Success:
      case DialogEnumType.Validate:
        dialog.callback();
        resetCommonDialog();
        break;
      case DialogEnumType.Confirm:
        resetConfirmDialog();
        break;
      default:
        break;
    }
  };

  const value = useMemo(() => {
    return {
      dialog,
      confirmDialog,
      openDialog,
      closeDialog,
    };
  }, [dialog, confirmDialog]);

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
};
export default DialogProviders;
