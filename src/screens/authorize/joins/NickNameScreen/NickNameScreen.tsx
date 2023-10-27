import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import { AuthorizeMenu } from 'constants/app/menu';
import { UserInfoStatus } from 'constants/authorize/join';
import useDialog from 'hooks/app/useDialog';
import { useNicknameCheck } from 'hooks/queries/auth';
import i18n from 'locales';
import { Dispatch, useState } from 'react';
import { colors } from 'styles/theme';
import { RootStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import { validateNickname } from 'utils/validate';

interface Props {
  dispatch: Dispatch<Action>;
}

const NickNameScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
        text: i18n.t('duplicated_nickname'),
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
      titleElements={[i18n.t('to_use_open_off'), i18n.t('input_nickname')]}
      authorizeButton={{
        handlePress: handleAuthorize,
        label: i18n.t('confirm'),
        isActive,
      }}
    >
      <EssentialInput
        validation={validateNickname}
        label={i18n.t('nickname')}
        value={nickname}
        setValue={setNickname}
        type="nickname"
      />
    </ScreenCover>
  );
};

export default NickNameScreen;
