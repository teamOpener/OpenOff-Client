import AuthorizeFlowButton from 'components/authorize/buttons/AuthorizeFlowButton/AuthorizeFlowButton';
import AuthorizeFlowTitle from 'components/authorize/texts/AuthorizeFlowTitle/AuthorizeFlowTitle';
import { ReactNode, SetStateAction, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import screenCoverStyles from './ScreenCover.style';

interface Props {
  titleElements?: string[];
  children?: ReactNode;
  authorizeButton: {
    handlePress: () => void;
    label: string;
    isActive: boolean;
  };
}

const ScreenCover = ({
  titleElements = [],
  children,
  authorizeButton,
}: Props) => {
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
      style={screenCoverStyles.container}
    >
      {Platform.OS === 'ios' ? (
        <ScrollView style={screenCoverStyles.scrollContainer}>
          <AuthorizeFlowTitle titleElements={titleElements} />
          {children}
        </ScrollView>
      ) : (
        <View style={screenCoverStyles.scrollContainer}>
          <AuthorizeFlowTitle titleElements={titleElements} />
          {children}
        </View>
      )}
      <AuthorizeFlowButton
        handlePress={authorizeButton.handlePress}
        label={authorizeButton.label}
        isActive={authorizeButton.isActive}
      />
    </KeyboardAvoidingView>
  );
};

export default ScreenCover;
