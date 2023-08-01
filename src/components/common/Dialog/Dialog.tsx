import React from 'react';
import { Modal, TouchableOpacity, View, Pressable } from 'react-native';
import { Dialog } from 'types/apps/dialog';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import dialogStyles from './Dialog.style';

interface Props {
  dialog: Dialog;
  closeDialog: () => void;
}

const CommonDialog = ({ dialog, closeDialog }: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={dialog.isShow}
      style={dialogStyles.modalView}
    >
      <Pressable onPress={closeDialog} style={dialogStyles.modalBackground}>
        <View style={dialogStyles.modalContainer}>
          <View style={dialogStyles.typeShow}>
            <View style={dialogStyles.iconContainer}>
              {dialog.type === 'success' ? (
                <Icon name="IconCheck" fill="white" size={30} />
              ) : (
                <Icon name="IconExit" fill="white" size={25} />
              )}
            </View>
          </View>
          <View style={dialogStyles.textContainer}>
            {dialog.text.split(' ').map((word: string, _id) => (
              <Text key={_id} color="white" variant="h4">
                {`${word} `}
              </Text>
            ))}
          </View>
          <TouchableOpacity
            style={dialogStyles.buttonContainer}
            onPress={closeDialog}
          >
            <Text variant="h4">닫기</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default CommonDialog;
