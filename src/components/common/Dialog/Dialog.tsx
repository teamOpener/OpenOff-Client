import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import { Dialog } from 'types/apps/dialog';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import dialogStyles from './Dialog.style';

interface Props {
  dialog: Dialog;
  closeDialog: () => void;
}

const CommonDialog = ({ dialog, closeDialog }: Props) => {
  const handleConfirm = () => {
    dialog.apply();
    closeDialog();
  };
  return (
    <Modal
      animationType="fade"
      transparent
      visible={dialog.isShow}
      style={dialogStyles.modalView}
    >
      <Pressable onPress={closeDialog} style={dialogStyles.modalBackground}>
        <View style={dialogStyles.modalContainer}>
          {dialog.type !== 'confirm' && (
            <View style={dialogStyles.typeShow}>
              <View style={dialogStyles.iconContainer}>
                {dialog.type === 'success' ? (
                  <Icon name="IconCheck" fill="white" size={30} />
                ) : (
                  <Icon name="IconExit" fill="white" size={25} />
                )}
              </View>
            </View>
          )}

          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...dialogStyles.textContainer,
              marginTop: dialog.type !== 'confirm' ? 16 : 0,
            }}
          >
            {dialog.text.split(' ').map((word: string, _id) => (
              <Text key={_id} style={dialogStyles.text}>
                {`${word} `}
              </Text>
            ))}
          </View>
          {dialog.type === 'confirm' ? (
            <View style={dialogStyles.confirmButtonCover}>
              <TouchableOpacity
                onPress={handleConfirm}
                style={dialogStyles.confirmButtonContainer}
              >
                <Text style={dialogStyles.text}>{dialog.applyText}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeDialog}
                style={dialogStyles.confirmButtonContainer}
              >
                <Text style={dialogStyles.text}>{dialog.closeText}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={dialogStyles.buttonContainer}
              onPress={closeDialog}
            >
              <Text style={dialogStyles.text}>{dialog.closeText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

export default CommonDialog;
