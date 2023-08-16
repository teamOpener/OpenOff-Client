import Text from 'components/common/Text/Text';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { DialogEnumType } from 'types/apps/dialog';
import useDialog from 'hooks/app/useDialog';
import { Modal } from 'react-native-paper';
import confirmDialogStyles from './ConfirmDialog.style';

const ConfirmDialog = () => {
  const { confirmDialog, closeDialog } = useDialog();

  const handleConfirm = () => {
    confirmDialog.apply();
    closeDialog(DialogEnumType.Confirm);
  };

  return (
    <Modal visible={confirmDialog.isShow} style={confirmDialogStyles.modalView}>
      <Pressable
        onPress={(event) => {
          event.stopPropagation();
          if (event.target !== event.currentTarget) return;
          closeDialog(DialogEnumType.Confirm);
        }}
        style={confirmDialogStyles.modalBackground}
      >
        <View style={confirmDialogStyles.modalContainer}>
          <View style={confirmDialogStyles.textContainer}>
            {confirmDialog.text.split(' ').map((word: string, _id) => (
              <Text key={_id} style={confirmDialogStyles.text}>
                {`${word} `}
              </Text>
            ))}
          </View>
          <View style={confirmDialogStyles.confirmButtonCover}>
            <TouchableOpacity
              onPress={handleConfirm}
              style={confirmDialogStyles.confirmButtonContainer}
            >
              <Text style={confirmDialogStyles.text}>
                {confirmDialog.applyText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => closeDialog(DialogEnumType.Confirm)}
              style={confirmDialogStyles.confirmButtonContainer}
            >
              <Text style={confirmDialogStyles.text}>
                {confirmDialog.closeText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ConfirmDialog;
