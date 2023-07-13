import { NavigationProp, useNavigation } from '@react-navigation/native';
import AuthorizeFlowButton from 'components/authorize/buttons/AuthorizeFlowButton/AuthorizeFlowButton';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import UserInfoStatus from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import { Dispatch, useState } from 'react';
import { Text, View } from 'react-native';
import { RootStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import { validateNickName } from 'utils/validate';
import nickNameScreenStyles from './NickNameScreen.style';

interface Props {
  dispatch: Dispatch<Action>;
}

const NickNameScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [nickName, setNickName] = useState<string>('');
  const isActive = !validateNickName(nickName) && nickName.length > 1;
  return (
    <View style={nickNameScreenStyles.container}>
      <View style={nickNameScreenStyles.titleContainer}>
        <Text style={nickNameScreenStyles.title}>오픈오프에서 사용할</Text>
        <Text style={nickNameScreenStyles.title}>닉네임을 입력해주세요.</Text>
      </View>
      <EssentialInput
        validation={validateNickName}
        label="닉네임"
        maxLength={5}
        value={nickName}
        setValue={setNickName}
        type="nickname"
      />
      <AuthorizeFlowButton
        handlePress={() => {
          dispatch({ type: UserInfoStatus.SET_NICK_NAME, nickName });
          navigation.navigate(AuthorizeMenu.UserInfo);
        }}
        label="확인"
        isActive={isActive}
      />
    </View>
  );
};

export default NickNameScreen;
