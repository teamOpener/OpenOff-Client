import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import { AuthorizeMenu } from 'constants/app/menu';
import { UserInfoStatus } from 'constants/authorize/join';
import useDialog from 'hooks/app/useDialog';
import { useNicknameCheck } from 'hooks/queries/auth';
import { Dispatch, useState } from 'react';
import { colors } from 'styles/theme';
import { AuthStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import { validateNickname } from 'utils/validate';

interface Props {
  dispatch: Dispatch<Action>;
}

const NickNameScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [nickname, setNickname] = useState<string>('');
  const isActive = !validateNickname(nickname) && nickname.length > 1;
  const { openDialog } = useDialog();

  const { mutateAsync: checkNickname, isLoading: isCheckNickname } =
    useNicknameCheck();

  const handleAuthorize = async () => {
    const checkInfo = await checkNickname(nickname);
    if (checkInfo.data?.isExist) {
      openDialog({
        type: 'validate',
        text: '중복된 닉네임입니다. 다시 설정해주세요.',
      });
      return;
    }
    dispatch({ type: UserInfoStatus.SET_NICK_NAME, nickname });
    navigation.navigate(AuthorizeMenu.UserInfo);
  };

  if (isCheckNickname)
    return <CommonLoading isActive backgroundColor={colors.background} />;

  return (
    <ScreenCover
      titleElements={['오픈오프에서 사용할', '닉네임을 입력해주세요.']}
      authorizeButton={{
        handlePress: handleAuthorize,
        label: '확인',
        isActive,
      }}
    >
      <EssentialInput
        validation={validateNickname}
        label="닉네임"
        value={nickname}
        setValue={setNickname}
        type="nickname"
      />
    </ScreenCover>
  );
};

export default NickNameScreen;
