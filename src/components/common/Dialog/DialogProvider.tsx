import useDialog from 'hooks/app/useDialog';
import { PropsWithChildren } from 'react';
import DialogContext from 'utils/DialogContext';
import { Portal } from 'react-native-paper';
import Dialog from './Dialog';

const DialogProvider = ({ children }: PropsWithChildren) => {
  const { dialogContextValue, dialog, closeDialog } = useDialog();

  return (
    <Portal.Host>
      <DialogContext.Provider value={dialogContextValue}>
        {children}
        <Portal>
          <Dialog dialog={dialog} closeDialog={closeDialog} />
        </Portal>
      </DialogContext.Provider>
    </Portal.Host>
  );
};

export default DialogProvider;
