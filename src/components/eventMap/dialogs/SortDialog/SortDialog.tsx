import Icon from 'components/common/Icon/Icon';
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
            정렬 기준
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
              날짜순
            </Text>
            {value === 'date' ? (
              <Icon size={15} name="IconCheck" fill="main" />
            ) : (
              <View style={sortDialogStyles.emptySpace} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={sortDialogStyles.buttonContainer}
            onPress={() => handlePress('distance')}
          >
            <Text
              style={sortDialogStyles.textContainer}
              color={value === 'distance' ? 'main' : 'white'}
              variant="body1"
            >
              거리순
            </Text>
            {value === 'distance' ? (
              <Icon size={15} name="IconCheck" fill="main" />
            ) : (
              <View style={sortDialogStyles.emptySpace} />
            )}
          </TouchableOpacity>
          <View style={sortDialogStyles.cancelContainer}>
            <TouchableOpacity onPress={handleDialog}>
              <Text color="white" variant="body1">
                취소
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default SortDialog;
