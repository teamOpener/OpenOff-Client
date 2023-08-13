import useDialog from 'hooks/app/useDialog';
import { PropsWithChildren } from 'react';
import DialogContext from 'utils/DialogContext';
import { Provider, Portal } from 'react-native-paper';
import ConfirmDialog from './ConfirmDialog/ConfirmDialog';
import Dialog from './Dialog/Dialog';

const DialogProvider = ({ children }: PropsWithChildren) => {
  const { dialogContextValue, dialog, confirmDialog, closeDialog } =
    useDialog();

  return (
    <DialogContext.Provider value={dialogContextValue}>
      <Provider>
        <Portal>
          <Dialog dialog={dialog} closeDialog={() => closeDialog('success')} />
          <ConfirmDialog
            dialog={confirmDialog}
            closeDialog={() => closeDialog('confirm')}
          />
        </Portal>
        {children}
      </Provider>
    </DialogContext.Provider>
  );
};

export default DialogProvider;
