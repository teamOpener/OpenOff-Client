import { CONSTANT_EVENT_DETAIL } from 'constants/eventDetail/eventDetailConstants';
import { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import screenLayoutStyles from './ScreenLayout.style';

const ScreenLayout = ({ children }: PropsWithChildren) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
