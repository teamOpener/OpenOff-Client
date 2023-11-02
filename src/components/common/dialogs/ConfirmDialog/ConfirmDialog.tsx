import i18n from 'locales';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import useDialog from 'hooks/app/useDialog';
import { useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { DialogEnumType } from 'types/apps/dialog';
import DenyEventReason from 'types/event/DenyEventReason';
import confirmDialogStyles from './ConfirmDialog.style';

const ConfirmDialog = () => {
  const { confirmDialog, closeDialog } = useDialog();
  const [denyReason, setDenyReason] = useState<DenyEventReason>(
    DenyEventReason.A,
  );

  const handleConfirm = () => {
    if (confirmDialog.denyText) {
      confirmDialog.deny(denyReason);
    } else {
      confirmDialog.apply();
    }
    closeDialog(DialogEnumType.Confirm);
    setDenyReason(DenyEventReason.A);
  };

  const handleCancel = () => {
    closeDialog(DialogEnumType.Confirm);
    setTimeout(() => {
      setDenyReason(DenyEventReason.A);
    }, 1000);
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

          {confirmDialog.denyText && (
            <View>
              <Text variant="body2">{i18n.t('content_decline')}</Text>
              <Spacing height={10} />

              <TouchableOpacity
                activeOpacity={0.8}
                style={confirmDialogStyles.reasonContainer}
                onPress={() => setDenyReason(DenyEventReason.A)}
              >
                <View
                  style={[
                    confirmDialogStyles.circle,
                    denyReason === DenyEventReason.A &&
                      confirmDialogStyles.activeCircle,
                  ]}
                />
                <Text variant="body2">{DenyEventReason.A}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={confirmDialogStyles.reasonContainer}
                onPress={() => setDenyReason(DenyEventReason.B)}
              >
                <View
                  style={[
                    confirmDialogStyles.circle,
                    denyReason === DenyEventReason.B &&
                      confirmDialogStyles.activeCircle,
                  ]}
                />
                <Text variant="body2">{DenyEventReason.B}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={confirmDialogStyles.reasonContainer}
                onPress={() => setDenyReason(DenyEventReason.C)}
              >
                <View
                  style={[
                    confirmDialogStyles.circle,
                    denyReason === DenyEventReason.C &&
                      confirmDialogStyles.activeCircle,
                  ]}
                />
                <Text variant="body2">{DenyEventReason.C}</Text>
              </TouchableOpacity>
              <Spacing height={20} />
            </View>
          )}

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
              onPress={handleCancel}
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
