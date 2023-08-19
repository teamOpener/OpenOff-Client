import { Pressable, TouchableOpacity, View } from 'react-native';
import { DialogEnumType } from 'types/apps/dialog';
import useDialog from 'hooks/app/useDialog';
import { Modal } from 'react-native-paper';
import Icon from '../../Icon/Icon';
import Text from '../../Text/Text';
import dialogStyles from './Dialog.style';

const Dialog = () => {
  const { dialog, closeDialog } = useDialog();

  const contentsWords = dialog.contents.split(/ |\n/);

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

          <TouchableOpacity
            style={dialogStyles.buttonContainer}
            onPress={() => closeDialog(DialogEnumType.Success)}
          >
            <Text style={dialogStyles.text}>{dialog.closeText}</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default Dialog;
