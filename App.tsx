// import StorybookUIRoot from './.ondevice/Storybook';
// export { StorybookUIRoot as default };

// 스토리북 실행을 원한다면 위에 코드 주석 해제, 아래 코드 주석처리
// 서비스 실행을 원한다면 아래 코드 주석 해제, 위에 코드 주석처리
import { useFlipper } from '@react-navigation/devtools';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthorizeNavigator from 'navigators/AuthorizeNavigator';
import Navigator from 'navigators/Navigator';
import { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { MyTheme, colors } from 'styles/theme';
import Dialog from 'types/apps/dialog';
import DialogContext from 'utils/DialogContext';

const appStyles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

// TODO
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 3, //  3분
      refetchOnWindowFocus: false,
    },
  },
});

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

const App = () => {
  const [dialog, setDialog] = useState<Dialog>({
    type: 'success',
    text: '',
    isShow: false,
  });
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  const openDialog = (text: string, type: string) => {
    setDialog({
      text,
      type,
      isShow: true,
    });
  };

  const closeDialog = () => {
    setDialog({
      type: 'success',
      text: '',
      isShow: false,
    });
  };

  const dialogContextValue = useMemo(() => {
    return { openDialog, closeDialog };
  }, [!!dialog.isShow]);

  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => SplashScreen.hide(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DialogContext.Provider value={dialogContextValue}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={appStyles.safeAreaContainer}>
          <GestureHandlerRootView style={appStyles.gestureContainer}>
            <NavigationContainer theme={MyTheme} ref={navigationRef}>
              <StatusBar backgroundColor={colors.background} />
              {isLogin ? (
                <Navigator />
              ) : (
                <AuthorizeNavigator setIsLogin={setIsLogin} />
              )}
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaView>
      </QueryClientProvider>
    </DialogContext.Provider>
  );
};

// 유동적 폰트 크기 제한
interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}

(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false;

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean; padding?: number };
}

(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.allowFontScaling = false;
(TextInput as unknown as TextInputWithDefaultProps).defaultProps!.padding = 0;

export default App;
