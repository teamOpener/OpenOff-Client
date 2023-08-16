/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import {
  CommonDialog,
  ConfirmDialog,
  DialogContextType,
} from 'types/apps/dialog';

export const dialogInitialValue: CommonDialog = {
  type: 'success',
  text: '',
  isShow: false,
  contents: '',
  callback: () => {},
  closeText: '닫기',
};

export const confirmDialogInitialValue: ConfirmDialog = {
  text: '',
  isShow: false,
  apply: () => {},
  applyText: '적용',
  closeText: '닫기',
};

const dialogContext: DialogContextType = {
  dialog: dialogInitialValue,
  confirmDialog: confirmDialogInitialValue,
  openDialog: () => {},
  closeDialog: () => {},
};

export const DialogContext = createContext<DialogContextType>(dialogContext);
