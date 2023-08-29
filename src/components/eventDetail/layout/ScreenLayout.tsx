import { CONSTANT_EVENT_DETAIL } from 'constants/eventDetail/eventDetailConstants';
import { PropsWithChildren, SetStateAction, useEffect, useState } from 'react';
import { KeyboardAvoidingView, NativeModules, Platform } from 'react-native';
import screenLayoutStyles from './ScreenLayout.style';

const ScreenLayout = ({ children }: PropsWithChildren) => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);
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
      style={[
        screenLayoutStyles.container,
        {
          paddingHorizontal: CONSTANT_EVENT_DETAIL.SCREEN_PADDING,
        },
      ]}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default ScreenLayout;
