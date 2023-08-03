import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import { CommonDialog } from 'types/apps/dialog';
import Icon from '../../Icon/Icon';
import Text from '../../Text/Text';
import dialogStyles from './Dialog.style';

interface Props {
  dialog: CommonDialog;
  closeDialog: () => void;
}

const Dialog = ({ dialog, closeDialog }: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={dialog.isShow}
      style={dialogStyles.modalView}
    >
      <Pressable
        onPress={(event) => {
          event.stopPropagation();
          if (event.target !== event.currentTarget) return;
          closeDialog();
        }}
        style={dialogStyles.modalBackground}
      >
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

          <View style={dialogStyles.innerContainer}>
            <View style={dialogStyles.textContainer}>
              {dialog.text.split(' ').map((word: string, _id) => (
                <Text key={_id} style={dialogStyles.text}>
                  {`${word} `}
                </Text>
              ))}
            </View>

            {dialog.contents && (
              <View
                style={[
                  dialogStyles.textContainer,
                  dialogStyles.subTextContainer,
                ]}
              >
                {dialog.contents.split(' ').map((word: string, _id) => (
                  <Text key={_id} style={dialogStyles.contentsText}>
                    {`${word} `}
                  </Text>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity
            style={dialogStyles.buttonContainer}
            onPress={closeDialog}
          >
            <Text style={dialogStyles.text}>{dialog.closeText}</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default Dialog;
