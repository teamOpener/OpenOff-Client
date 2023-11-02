import i18n from 'locales';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import Text from 'components/common/Text/Text';
import { useCallback } from 'react';
import { BackHandler, View } from 'react-native';
import { useAuthorizeStore } from 'stores/Authorize';
import { JoinInfo } from 'types/join';
import {
  BottomTabNavigationScreenParams,
  RootStackParamList,
} from 'types/apps/menu';
import joinCompleteScreenStyles from './JoinCompleteScreen.style';

interface Props {
  state: JoinInfo;
}

const JoinCompleteScreen = ({ state }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { setIsLogin } = useAuthorizeStore();

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        navigation.navigate(
          'BottomTabNavigator',
          undefined as unknown as BottomTabNavigationScreenParams,
        );
        setIsLogin(true);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );

  return (
    <ScreenCover
      authorizeButton={{
        handlePress: () => {
          setIsLogin(true);
          navigation.navigate(
            'BottomTabNavigator',
            undefined as unknown as BottomTabNavigationScreenParams,
          );
        },
        label: i18n.t('start'),
        isActive: true,
      }}
      titleElements={[
        i18n.t('user_nickname', { nickname: state.nickname }),
        i18n.t('congrats_sign_up'),
      ]}
    >
      <Text style={joinCompleteScreenStyles.myFieldTitle}>
        {i18n.t('my_field_title')}
      </Text>
      <View style={joinCompleteScreenStyles.myFieldContainer}>
        {state.interestField.map((field) =>
          field ? (
            <Text key={field.value} style={joinCompleteScreenStyles.myField}>
              #{field.label}
            </Text>
          ) : null,
        )}
      </View>
    </ScreenCover>
  );
};

export default JoinCompleteScreen;
