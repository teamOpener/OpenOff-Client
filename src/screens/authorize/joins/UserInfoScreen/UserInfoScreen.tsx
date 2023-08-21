import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import BaseInfoInput from 'components/authorize/inputs/BaseInfoInput/BaseInfoInput';
import BirthSettingInput from 'components/authorize/inputs/BirthSettingInput/BirthSettingInput';
import GenderInput from 'components/authorize/inputs/GenderInput/GenderInput';
import { UserInfoStatus } from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import { Dispatch, useState } from 'react';
import { View } from 'react-native';
import { AuthStackParamList } from 'types/apps/menu';
import { Action, Gender } from 'types/join';
import { validateBirthday, validateName } from 'utils/validate';
import userInfoScreenStyles from './UserInfoScreen.style';

interface Props {
  dispatch: Dispatch<Action>;
}

const UserInfoScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [username, setUsername] = useState<string>('');
  const [birth, setBirth] = useState<string>('2000-00-00');
  const [gender, setGender] = useState<Gender>('MAN');

  const isActive =
    !validateName(username) && !validateBirthday(birth) && username.length > 1;

  const handleAuthorizeFlow = () => {
    dispatch({ type: UserInfoStatus.SET_NAME, username });
    dispatch({ type: UserInfoStatus.SET_GENDER, gender });
    dispatch({ type: UserInfoStatus.SET_BIRTH, birth });
    navigation.navigate(AuthorizeMenu.InterestField);
  };

  return (
    <ScreenCover
      titleElements={['오픈오프 이용을 위해', '정보를 입력해주세요.']}
      authorizeButton={{
        handlePress: handleAuthorizeFlow,
        label: '확인',
        isActive,
      }}
    >
      <BaseInfoInput
        label="이름"
        value={username}
        setValue={setUsername}
        validation={validateName}
      />
      <View style={userInfoScreenStyles.detailUserInfo}>
        <BirthSettingInput
          label="생일"
          value={birth}
          setValue={setBirth}
          validation={validateBirthday}
        />
        <GenderInput value={gender} setValue={setGender} />
      </View>
    </ScreenCover>
  );
};

export default UserInfoScreen;
