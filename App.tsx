// import StorybookUIRoot from './.ondevice/Storybook';
// export { StorybookUIRoot as default };

// 스토리북 실행을 원한다면 위에 코드 주석 해제, 아래 코드 주석처리
// 서비스 실행을 원한다면 아래 코드 주석 해제, 위에 코드 주석처리
import { NavigationContainer } from '@react-navigation/native';
import AuthorizeNavigator from 'navigators/AuthorizeNavigator';
import Navigator from 'navigators/Navigator';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { colors } from 'styles/theme';

const appStyles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => SplashScreen.hide(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={appStyles.safeAreaContainer}>
      <GestureHandlerRootView style={appStyles.gestureContainer}>
        <NavigationContainer>
          {isLogin ? (
            <Navigator />
          ) : (
            <AuthorizeNavigator setIsLogin={setIsLogin} />
          )}
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;
