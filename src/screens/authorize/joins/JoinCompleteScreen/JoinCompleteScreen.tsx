import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import Text from 'components/common/Text/Text';
import React, { useCallback } from 'react';
import { BackHandler, View } from 'react-native';
import { JoinInfo } from 'types/join';
import { useFocusEffect } from '@react-navigation/native';
import joinCompleteScreenStyles from './JoinCompleteScreen.style';

interface Props {
  state: JoinInfo;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinCompleteScreen = ({ state, setIsLogin }: Props) => {
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
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
        },
        label: '시작하기',
        isActive: true,
      }}
      titleElements={[`'${state.nickname}'님`, '회원가입을 축하합니다!']}
    >
      <Text style={joinCompleteScreenStyles.myFieldTitle}>나의 관심사는</Text>
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
