import useDialog from 'hooks/app/useDialog';
import { PropsWithChildren } from 'react';
import { Portal } from 'react-native-paper';
import DialogContext from 'utils/DialogContext';
import ConfirmDialog from './ConfirmDialog/ConfirmDialog';
import Dialog from './Dialog/Dialog';

const DialogProvider = ({ children }: PropsWithChildren) => {
  const { dialogContextValue, dialog, confirmDialog, closeDialog } =
    useDialog();

  return (
    <Portal.Host>
      <DialogContext.Provider value={dialogContextValue}>
        {children}
        <Portal>
          <Dialog dialog={dialog} closeDialog={() => closeDialog('success')} />
          <ConfirmDialog
            dialog={confirmDialog}
            closeDialog={() => closeDialog('confirm')}
          />
        </Portal>
      </DialogContext.Provider>
    </Portal.Host>
  );
};

export default DialogProvider;
