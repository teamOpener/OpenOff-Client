import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import consoleScreenLayoutStyles from './ConsoleScreenLayout.style';

const ConsoleScreenLayout = ({ children }: PropsWithChildren) => {
  return <View style={consoleScreenLayoutStyles.container}>{children}</View>;
};

export default ConsoleScreenLayout;
