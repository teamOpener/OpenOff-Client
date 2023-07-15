import { TouchableOpacity } from 'react-native';
import React from 'react';
import socialLoginButtonStyles from './SocialLoginButton.style';

interface Props extends React.ComponentProps<typeof TouchableOpacity> {
  color: string;
  handlePress: () => void;
}

const SocialLoginButton = ({ color, handlePress, ...props }: Props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ ...socialLoginButtonStyles.container, backgroundColor: color }}
      {...props}
    />
  );
};

export default SocialLoginButton;
