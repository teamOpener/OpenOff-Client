import i18n from 'locales';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import BaseInfoInput from 'components/authorize/inputs/BaseInfoInput/BaseInfoInput';
import BirthSettingInput from 'components/authorize/inputs/BirthSettingInput/BirthSettingInput';
import GenderInput from 'components/authorize/inputs/GenderInput/GenderInput';
import { AuthorizeMenu } from 'constants/app/menu';
import { UserInfoStatus } from 'constants/authorize/join';
import { Dispatch, useState } from 'react';
import { View } from 'react-native';
import { RootStackParamList } from 'types/apps/menu';
import { Action, Gender, JoinInfo } from 'types/join';
import { validateBirthday, validateName } from 'utils/validate';
import userInfoScreenStyles from './UserInfoScreen.style';

interface Props {
  state: JoinInfo;
  dispatch: Dispatch<Action>;
}

const UserInfoScreen = ({ state, dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState<string>('');
  const [birth, setBirth] = useState<string>('2000-00-00');
  const [gender, setGender] = useState<Gender>('MAN');

  const isAppleLoginMode = state.username
    ? true
    : !validateName(username) && username.length > 1;

  const isActive = isAppleLoginMode && !validateBirthday(birth);

  const handleAuthorizeFlow = () => {
    if (!state.username) {
      dispatch({ type: UserInfoStatus.SET_NAME, username });
    }
    dispatch({ type: UserInfoStatus.SET_GENDER, gender });
    dispatch({ type: UserInfoStatus.SET_BIRTH, birth });
    navigation.navigate(AuthorizeMenu.InterestField);
  };

  return (
    <ScreenCover
      titleElements={[i18n.t('to_open_off_usage'), i18n.t('input_information')]}
      authorizeButton={{
        handlePress: handleAuthorizeFlow,
        label: i18n.t('confirm'),
        isActive,
      }}
    >
      {!state.username && (
        <BaseInfoInput
          label={i18n.t('name')}
          value={username}
          setValue={setUsername}
          validation={validateName}
        />
      )}
      <View style={userInfoScreenStyles.detailUserInfo}>
        <BirthSettingInput
          label={i18n.t('birth')}
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
