import { createContext } from 'react';
import { DialogType } from 'types/apps/dialog';

const DialogContext = createContext({
  openDialog: (text: string, type: DialogType, callback?: () => void) => {
    if (!callback) return;
    callback();
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeDialog: () => {},
});
export default DialogContext;
