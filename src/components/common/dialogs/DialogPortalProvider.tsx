import { PropsWithChildren } from 'react';
import { Provider, Portal } from 'react-native-paper';
import ConfirmDialog from './ConfirmDialog/ConfirmDialog';
import Dialog from './Dialog/Dialog';
import DialogProviders from './DialogProviders';

const DialogPortalProvider = ({ children }: PropsWithChildren) => {
  return (
    <DialogProviders>
      <Provider>
        <Portal>
          <Dialog />
          <ConfirmDialog />
        </Portal>
        {children}
      </Provider>
    </DialogProviders>
  );
};

export default DialogPortalProvider;
