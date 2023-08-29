type DialogType = 'success' | 'validate' | 'warning' | 'confirm';

export const enum DialogEnumType {
  Validate = 'validate',
  Success = 'success',
  Warning = 'warning',
  Confirm = 'confirm',
}

interface Dialog {
  text: string;
  isShow: boolean;
  closeText: string;
}

interface CommonDialog extends Dialog {
  type: DialogType;
  contents: string;
  callback: () => void;
  apply: () => void;
  applyText: string;
}

interface ConfirmDialog extends Dialog {
  apply: () => void;
  applyText: string;
  deny: (rejectReason: string) => void;
  denyText: string;
}

interface OpenDialog {
  text: string;
  type: DialogType;
  contents?: string;
  callback?: () => void;
  apply?: () => void;
  applyText?: string;
  closeText?: string;
  deny?: (rejectReason: string) => void;
  denyText?: string;
}

export type DialogContextType = {
  dialog: CommonDialog;
  confirmDialog: ConfirmDialog;
  openDialog: (data: OpenDialog) => void;
  closeDialog: (type: DialogEnumType) => void;
};

export type { CommonDialog, ConfirmDialog, Dialog, DialogType, OpenDialog };
