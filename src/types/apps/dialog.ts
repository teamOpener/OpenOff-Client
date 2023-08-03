type DialogType = 'success' | 'validate' | 'confirm';

interface Dialog {
  text: string;
  isShow: boolean;
  closeText: string;
}

interface CommonDialog extends Dialog {
  type: DialogType;
  contents: string;
  callback: () => void;
}

interface ConfirmDialog extends Dialog {
  apply: () => void;
  applyText: string;
}

interface OpenDialog {
  text: string;
  type: DialogType;
  contents?: string;
  callback?: () => void;
  apply?: () => void;
  applyText?: string;
  closeText?: string;
}

export type { CommonDialog, ConfirmDialog, Dialog, DialogType, OpenDialog };
