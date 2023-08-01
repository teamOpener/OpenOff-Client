import { createContext } from 'react';

const DialogContext = createContext({
  openDialog: (text: string, type: string, callback?: () => void) => {
    if (!callback) return;
    callback();
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeDialog: () => {},
});
export default DialogContext;
