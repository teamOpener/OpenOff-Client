import { createContext } from 'react';

const DialogContext = createContext({
  openDialog: (text: string, type: string) => {
    return false;
  },
  closeDialog: () => {
    return false;
  },
});
export default DialogContext;
