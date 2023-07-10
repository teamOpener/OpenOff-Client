import { NavigationProp, useNavigation } from '@react-navigation/native';
import AuthorizeFlowButton from 'components/authorize/buttons/AuthorizeFlowButton/AuthorizeFlowButton';
import BaseInfoInput from 'components/authorize/inputs/BaseInfoInput/BaseInfoInput';
import GenderInput from 'components/authorize/inputs/GenderInput/GenderInput';
import UserInfoStatus from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import { Dispatch, useState } from 'react';
import { Text, View } from 'react-native';
import { RootStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import { validateBirthday, validateName } from 'utils/validate';
import userInfoScreenStyles from './UserInfoScreen.style';

interface Props {
  dispatch: Dispatch<Action>;
}

const UserInfoScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [name, setName] = useState<string>('');
  const [birth, setBirth] = useState<string>('2000-00-00');
  const [gender, setGender] = useState<string>('남');
  const isActive = !validateName(name) && name.length > 1;
  return (
    <View style={userInfoScreenStyles.container}>
      <View style={userInfoScreenStyles.titleContainer}>
        <Text style={userInfoScreenStyles.title}>
          오픈오프 이용을 위해 정보를 입력해주세요.
        </Text>
      </View>
      <BaseInfoInput
        label="이름"
        value={name}
        width={350}
        setValue={setName}
        validation={validateName}
      />
      <View style={userInfoScreenStyles.detailUserInfo}>
        <BaseInfoInput
          label="생일"
          value={birth}
          width={165}
          setValue={setBirth}
          validation={validateBirthday}
          focusMode
        />
        <GenderInput value={gender} setValue={setGender} />
      </View>
      <AuthorizeFlowButton
        handlePress={() => {
          dispatch({ type: UserInfoStatus.SET_AGREE_TO_TERM, term: 'Y' });
          navigation.navigate(AuthorizeMenu.InterestField);
        }}
        label="확인"
        isActive={isActive}
      />
    </View>
  );
};

export default UserInfoScreen;
