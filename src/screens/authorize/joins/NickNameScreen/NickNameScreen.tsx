import { NavigationProp, useNavigation } from '@react-navigation/native';
import AuthorizeFlowButton from 'components/authorize/buttons/AuthorizeFlowButton/AuthorizeFlowButton';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import Text from 'components/common/Text/Text';
import { UserInfoStatus } from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import { Dispatch, useState } from 'react';
import { View } from 'react-native';
import { AuthStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import { validateNickname } from 'utils/validate';
import nicknameScreenStyles from './NickNameScreen.style';

interface Props {
  dispatch: Dispatch<Action>;
}

const NickNameScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [nickname, setNickname] = useState<string>('');
  const isActive = !validateNickname(nickname) && nickname.length > 1;
  return (
    <View style={nicknameScreenStyles.container}>
      <View style={nicknameScreenStyles.titleContainer}>
        <Text variant="h1" style={nicknameScreenStyles.title}>
          오픈오프에서 사용할
        </Text>
        <Text variant="h1" style={nicknameScreenStyles.title}>
          닉네임을 입력해주세요.
        </Text>
      </View>
      <EssentialInput
        validation={validateNickname}
        label="닉네임"
        maxLength={5}
        value={nickname}
        setValue={setNickname}
        type="nickname"
      />
      <AuthorizeFlowButton
        handlePress={() => {
          dispatch({ type: UserInfoStatus.SET_NICK_NAME, nickname });
          navigation.navigate(AuthorizeMenu.UserInfo);
        }}
        label="확인"
        isActive={isActive}
      />
    </View>
  );
};

export default NickNameScreen;
