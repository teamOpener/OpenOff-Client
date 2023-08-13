import Text from 'components/common/Text/Text';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { ConfirmDialog as ConfirmDialogType } from 'types/apps/dialog';
import { Modal } from 'react-native-paper';
import confirmDialogStyles from './ConfirmDialog.style';

interface Props {
  dialog: ConfirmDialogType;
  closeDialog: () => void;
}

const ConfirmDialog = ({ dialog, closeDialog }: Props) => {
  const handleConfirm = () => {
    dialog.apply();
    closeDialog();
  };
  return (
    <Modal visible={dialog.isShow} style={confirmDialogStyles.modalView}>
      <Pressable
        onPress={(event) => {
          event.stopPropagation();
          if (event.target !== event.currentTarget) return;
          closeDialog();
        }}
        style={confirmDialogStyles.modalBackground}
      >
        <View style={confirmDialogStyles.modalContainer}>
          <View style={confirmDialogStyles.textContainer}>
            {dialog.text.split(' ').map((word: string, _id) => (
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
              <Text style={confirmDialogStyles.text}>{dialog.applyText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={closeDialog}
              style={confirmDialogStyles.confirmButtonContainer}
            >
              <Text style={confirmDialogStyles.text}>{dialog.closeText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ConfirmDialog;
