type DialogType = 'success' | 'validate' | 'confirm';

interface Dialog {
  type: DialogType;
  text: string;
  isShow: boolean;
  callback: () => void;
  apply: () => void;
  applyText: string;
  closeText: string;
}

interface OpenDialog {
  text: string;
  type: DialogType;
  callback?: () => void;
  apply?: () => void;
  applyText?: string;
  closeText?: string;
}

export type { Dialog, DialogType, OpenDialog };
