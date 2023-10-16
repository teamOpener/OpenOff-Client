import i18n from 'locales';
import Divider from 'components/common/Divider/Divider';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import sortDialogStyles from './SortDialog.style';

interface Props {
  dialogShow: boolean;
  value: string;
  setValue: (value: string) => void;
  handleDialog: () => void;
}

const SortDialog = ({ dialogShow, value, setValue, handleDialog }: Props) => {
  const handlePress = (value: string) => {
    setValue(value);
    handleDialog();
  };
  return (
    <Modal
      style={sortDialogStyles.modalView}
      animationType="fade"
      transparent
      visible={dialogShow}
    >
      <Pressable
        style={sortDialogStyles.modalBackground}
        onPress={handleDialog}
      >
        <View style={sortDialogStyles.modalContainer}>
          <Text style={sortDialogStyles.title} color="white" variant="h3">
            {i18n.t('reason_selection')}
          </Text>

          <TouchableOpacity
            style={sortDialogStyles.buttonContainer}
            onPress={() => handlePress('date')}
          >
            <Text
              style={sortDialogStyles.textContainer}
              color={value === 'date' ? 'main' : 'white'}
              variant="body1"
            >
              {i18n.t('sort_date')}
            </Text>
            {value === 'date' && (
              <Icon size={15} name="IconCheck" fill="main" />
            )}
          </TouchableOpacity>

          <Divider height={1} color="darkGrey" />

          <TouchableOpacity
            style={sortDialogStyles.buttonContainer}
            onPress={() => handlePress('distance')}
          >
            <Text
              style={sortDialogStyles.textContainer}
              color={value === 'distance' ? 'main' : 'white'}
              variant="body1"
            >
              {i18n.t('sort_distance')}
            </Text>
            {value === 'distance' && (
              <Icon size={15} name="IconCheck" fill="main" />
            )}
          </TouchableOpacity>

          <Divider height={1} color="darkGrey" />
          <Spacing height={20} />

          <View style={sortDialogStyles.cancelContainer}>
            <TouchableOpacity onPress={handleDialog}>
              <Text color="grey" style={sortDialogStyles.cancelText}>
                {i18n.t('cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default SortDialog;
