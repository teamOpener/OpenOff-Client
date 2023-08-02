import { Modal, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from 'styles/theme';
import commonLoadingStyles from './CommonLoading.style';

interface Props {
  isActive: boolean;
}

const CommonLoading = ({ isActive }: Props) => {
  return (
    <Modal
      visible={isActive}
      animationType="fade"
      transparent
      style={commonLoadingStyles.modalView}
    >
      <View style={commonLoadingStyles.modalBackground}>
        <ActivityIndicator size="large" color={colors.main} animating />
      </View>
    </Modal>
  );
};

export default CommonLoading;
