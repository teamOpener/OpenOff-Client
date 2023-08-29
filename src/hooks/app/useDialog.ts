import { useContext } from 'react';
import { DialogContext } from 'components/common/dialogs/DialogContext';

const useDialog = () => {
  return useContext(DialogContext);
};

export default useDialog;
