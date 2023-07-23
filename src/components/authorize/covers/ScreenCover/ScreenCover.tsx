import AuthorizeFlowButton from 'components/authorize/buttons/AuthorizeFlowButton/AuthorizeFlowButton';
import { ReactNode, SetStateAction, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  ScrollView,
} from 'react-native';
import screenCoverStyles from './ScreenCover.style';

interface Props {
  children?: ReactNode;
  authorizeButton: {
    handlePress: () => void;
    label: string;
    isActive: boolean;
  };
}

const ScreenCover = ({ children, authorizeButton }: Props) => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);
  const { StatusBarManager } = NativeModules;
  useEffect(() => {
    if (Platform.OS === 'ios')
      StatusBarManager.getHeight(
        (statusBarFrameData: { height: SetStateAction<number> }) => {
          setStatusBarHeight(statusBarFrameData.height);
        },
      );
  });
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={statusBarHeight + 40}
      style={screenCoverStyles.scrollContainer}
    >
      {Platform.OS === 'ios' ? <ScrollView>{children}</ScrollView> : children}
      <AuthorizeFlowButton
        handlePress={authorizeButton.handlePress}
        label={authorizeButton.label}
        isActive={authorizeButton.isActive}
      />
    </KeyboardAvoidingView>
  );
};

export default ScreenCover;
