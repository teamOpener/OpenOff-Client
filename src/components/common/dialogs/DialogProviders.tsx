import i18n from 'locales';
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
      ...dialog,
      isShow: false,
    });
    setTimeout(() => {
      setDialog({
        text: '',
        type: DialogEnumType.Validate,
        isShow: false,
        contents: '',
        callback: () => {},
        closeText: i18n.t('close'),
        apply: () => {},
        applyText: '',
      });
    }, 200);
  };

  const resetConfirmDialog = () => {
    setConfirmDialog({
      ...confirmDialog,
      isShow: false,
    });
    setTimeout(() => {
      setConfirmDialog({
        isShow: false,
        text: '',
        apply: () => {},
        applyText: i18n.t('apply'),
        closeText: i18n.t('close'),
        deny: () => {},
        denyText: '',
      });
    }, 100);
  };

  const openDialog = ({
    text,
    type,
    callback = () => {},
    apply = () => {},
    contents = '',
    applyText = i18n.t('apply'),
    closeText = i18n.t('close'),
    deny = () => {},
    denyText = '',
  }: OpenDialog) => {
    switch (type) {
      case DialogEnumType.Validate:
      case DialogEnumType.Warning:
      case DialogEnumType.Success:
        setDialog({
          text,
          type,
          contents,
          callback,
          closeText,
          isShow: true,
          apply,
          applyText,
        });
        break;
      case DialogEnumType.Confirm:
        setConfirmDialog({
          text,
          apply,
          applyText,
          closeText,
          isShow: true,
          deny,
          denyText,
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
