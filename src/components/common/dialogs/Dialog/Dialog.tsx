import { Pressable, TouchableOpacity, View } from 'react-native';
import { DialogEnumType, DialogType } from 'types/apps/dialog';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import useDialog from 'hooks/app/useDialog';
import { Modal } from 'react-native-paper';
import * as Icons from 'assets/icons';
import Icon from '../../Icon/Icon';
import Text from '../../Text/Text';
import dialogStyles from './Dialog.style';

const Dialog = () => {
  const { dialog, closeDialog } = useDialog();

  const contentsWords = dialog.contents.split(/ |\n/);

  const handleConfirm = () => {
    dialog.apply();
    closeDialog(DialogEnumType.Success);
  };

  const iconType = (type: DialogType): keyof typeof Icons => {
    switch (type) {
      case DialogEnumType.Validate:
        return 'IconExit';
      case DialogEnumType.Warning:
        return 'IconWarning';
      case DialogEnumType.Success:
      default:
        return 'IconCheck';
    }
  };

  return (
    <Modal visible={dialog.isShow} style={dialogStyles.modalView}>
      <Pressable
        onPress={(event) => {
          event.stopPropagation();
          if (event.target !== event.currentTarget) return;
          closeDialog(DialogEnumType.Success);
        }}
        style={dialogStyles.modalBackground}
      >
        <View style={dialogStyles.modalContainer}>
          {dialog.type !== 'confirm' && (
            <View style={dialogStyles.typeShow}>
              <View style={dialogStyles.iconContainer}>
                <Icon name={iconType(dialog.type)} fill="white" size={25} />
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
                {contentsWords.map((word: string, id) =>
                  word.trim() === '' ? (
                    <View style={{ width: '100%', height: 13 }} />
                  ) : (
                    <Text key={id} style={dialogStyles.contentsText}>
                      {`${word} `}
                    </Text>
                  ),
                )}
              </View>
            )}
          </View>

          <SpaceLayout direction="row" size={10}>
            {dialog.applyText !== '적용' && (
              <TouchableOpacity
                style={dialogStyles.buttonContainer}
                onPress={handleConfirm}
              >
                <Text style={dialogStyles.text}>{dialog.applyText}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={dialogStyles.buttonContainer}
              onPress={() => closeDialog(DialogEnumType.Success)}
            >
              <Text style={dialogStyles.text}>{dialog.closeText}</Text>
            </TouchableOpacity>
          </SpaceLayout>
        </View>
      </Pressable>
    </Modal>
  );
};

export default Dialog;
