// 스토리북 실행을 원한다면 주석해제
// import StorybookUIRoot from './.ondevice/Storybook';
import { useFlipper } from '@react-navigation/devtools';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FallbackError from 'components/fallback/FallbackError';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import AuthorizeNavigator from 'navigators/AuthorizeNavigator';
import Navigator from 'navigators/Navigator';
import { Suspense, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { MyTheme, colors } from 'styles/theme';

// dayjs setting
import DialogPortalProvider from 'components/common/dialogs/DialogPortalProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useAuthorizeStore } from 'stores/Authorize';

dayjs.locale('ko');

const appStyles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000 * 60 * 3, //  3분
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      suspense: true,
    },
    mutations: {
      useErrorBoundary: true,
      retry: 0,
    },
  },
});

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

const App = () => {
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  const { isLogin } = useAuthorizeStore();

  useEffect(() => {
    const timer = setTimeout(() => SplashScreen.hide(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={FallbackError}>
        <Suspense
          fallback={
            <WithIconLoading isActive backgroundColor={colors.background} />
          }
        >
          <SafeAreaView style={appStyles.safeAreaContainer}>
            <GestureHandlerRootView style={appStyles.gestureContainer}>
              <NavigationContainer theme={MyTheme} ref={navigationRef}>
                <DialogPortalProvider>
                  {/* <StorybookUIRoot /> */}
                  {/* 스토리북 실행을 원한다면 위 주석해제, 아래 주석처리 */}
                  <StatusBar
                    backgroundColor={colors.background}
                    barStyle="light-content"
                  />
                  {isLogin ? <Navigator /> : <AuthorizeNavigator />}
                </DialogPortalProvider>
              </NavigationContainer>
            </GestureHandlerRootView>
          </SafeAreaView>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
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
