// import StorybookUIRoot from './.ondevice/Storybook';

// export { StorybookUIRoot as default };
import { NavigationContainer } from '@react-navigation/native';
import AuthorizeNavigator from 'navigators/AuthorizeNavigator';
import Navigator from 'navigators/Navigator';
import { useState } from 'react';

const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <NavigationContainer>
      {isLogin ? <Navigator /> : <AuthorizeNavigator />}
    </NavigationContainer>
  );
};

export default App;
