import { Modal, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from 'styles/theme';
import commonLoadingStyles from './CommonLoading.style';

interface Props {
  isActive: boolean;
  backgroundColor?: string;
}

const CommonLoading = ({
  isActive,
  backgroundColor = 'rgba(0, 0, 0, 0.4)',
}: Props) => {
  return (
    <Modal
      visible={isActive}
      animationType="fade"
      transparent
      style={commonLoadingStyles.modalView}
    >
      <View
        style={[
          commonLoadingStyles.modalBackground,
          {
            backgroundColor,
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.main} animating />
      </View>
    </Modal>
  );
};

export default CommonLoading;
