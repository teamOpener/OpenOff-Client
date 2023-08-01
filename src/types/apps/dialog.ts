type DialogType = 'success' | 'validate';

interface Dialog {
  type: DialogType;
  text: string;
  isShow: boolean;
  callback: () => void;
}

export type { Dialog, DialogType };
