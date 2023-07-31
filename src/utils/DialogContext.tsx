import { createContext } from 'react';

const DialogContext = createContext({
  openDialog: (text: string, type: string) => {
    console.log(text);
  },
  closeDialog: () => {
    console.log('close');
  },
});
export default DialogContext;
