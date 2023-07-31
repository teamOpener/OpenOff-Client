import { createContext } from 'react';

const DialogContext = createContext({
  openDialog: (text: string, type: string) => {
    console.log(text);
  },
  closeDialog: (callback?: () => void) => {
    if (!callback) return;
    callback();
  },
});
export default DialogContext;
