import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { BottomTabMenu } from 'constants/menu';
import HomeScreen from 'screens/HomeScreen/HomeScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={BottomTabMenu.Home}
        component={HomeScreen}
        options={{
          tabBarLabel: '홈',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
