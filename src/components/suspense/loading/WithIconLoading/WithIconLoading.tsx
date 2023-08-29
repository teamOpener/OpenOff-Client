import { Modal, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { colors } from 'styles/theme';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import Spacing from 'components/common/Spacing/Spacing';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import useBlinkingEffect from 'hooks/animations/useBlinkingEffect';
import withIconLoadingStyles from './WithIconLoading.style';

interface Props {
  isActive: boolean;
  backgroundColor?: string;
  text?: string;
}

const WithIconLoading = ({
  isActive,
  backgroundColor = 'rgba(0, 0, 0, 0.4)',
  text,
}: Props) => {
  const animatedDefaultStyle = useBlinkingEffect(1000);
  const animatedStarStyle = useBlinkingEffect(800);
  const animatedHeartStyle = useBlinkingEffect(600);

  return (
    <Modal
      visible={isActive}
      animationType="fade"
      transparent
      style={withIconLoadingStyles.modalView}
    >
      <View
        style={[
          withIconLoadingStyles.modalBackground,
          {
            backgroundColor,
          },
        ]}
      >
        <SpaceLayout size={2}>
          <Animated.View style={animatedStarStyle}>
            <Icon
              name="IconTicketStar"
              size={16}
              fill="grey"
              style={withIconLoadingStyles.leftIcon}
            />
          </Animated.View>

          <Animated.View
            style={[animatedDefaultStyle, withIconLoadingStyles.absoluteCircle]}
          />
          <ActivityIndicator size={40} color={colors.main} animating />

          <Animated.View style={animatedDefaultStyle}>
            <Icon
              name="IconTicketStar"
              size={10}
              fill="grey"
              style={withIconLoadingStyles.rightTopIcon}
            />
          </Animated.View>
          <Animated.View style={animatedHeartStyle}>
            <Icon
              name="IconTicketHeart"
              size={9}
              fill="grey"
              style={withIconLoadingStyles.rightIcon}
            />
          </Animated.View>
        </SpaceLayout>
        {text && (
          <>
            <Spacing height={40} />
            <Text variant="body2" color="lavender">
              {text}
            </Text>
          </>
        )}
      </View>
    </Modal>
  );
};

export default WithIconLoading;
