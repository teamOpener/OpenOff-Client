import { PropsWithChildren, SetStateAction, useEffect, useState } from 'react';
import { KeyboardAvoidingView, NativeModules, Platform } from 'react-native';
import keyboardAvoidingScreenLayoutStyles from './KeyboardAvoidingScreenLayout.style';

const KeyboardAvoidingScreenLayout = ({ children }: PropsWithChildren) => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(54);
  const { StatusBarManager } = NativeModules;

  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(
        (statusBarFrameData: { height: SetStateAction<number> }) => {
          setStatusBarHeight(statusBarFrameData.height);
        },
      );
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={statusBarHeight + 50}
      style={keyboardAvoidingScreenLayoutStyles.container}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingScreenLayout;
