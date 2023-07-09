import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from 'styles/theme';
import authorizeFlowButtonStyles from './AuthorizeFlowButton.style';

interface Props {
  label: string;
  isActive: boolean;
  handlePress: () => void;
}

const AuthorizeFlowButton = ({ label, isActive, handlePress }: Props) => {
  const handleNotActive = () => {
    return false;
  };
  const computedButtonStyle = {
    backgroundColor: isActive ? colors.main : colors.grey,
    fontColor: isActive ? colors.white : colors.darkGrey,
  };
  return (
    <View style={authorizeFlowButtonStyles.absolutePosition}>
      <TouchableOpacity
        onPress={isActive ? handlePress : handleNotActive}
        style={{
          ...authorizeFlowButtonStyles.container,
          backgroundColor: computedButtonStyle.backgroundColor,
        }}
      >
        <Text
          style={{
            ...authorizeFlowButtonStyles.label,
            color: computedButtonStyle.fontColor,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthorizeFlowButton;
