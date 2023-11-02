import { NavigationProp, useNavigation } from '@react-navigation/native';
import ScreenCover from 'components/authorize/covers/ScreenCover/ScreenCover';
import EssentialInput from 'components/authorize/inputs/EssentialInput/EssentialInput';
import CommonLoading from 'components/suspense/loading/CommonLoading/CommonLoading';
import { AuthorizeMenu } from 'constants/app/menu';
import { UserInfoStatus } from 'constants/authorize/join';
import useDialog from 'hooks/app/useDialog';
import { useEmailCheck, useNormalSignUp } from 'hooks/queries/auth';
import i18n from 'locales';
import { Dispatch, useState } from 'react';
import { colors } from 'styles/theme';
import { RootStackParamList } from 'types/apps/menu';
import { Action } from 'types/join';
import { validateEmail, validatePassword } from 'utils/validate';

interface Props {
  dispatch: Dispatch<Action>;
}

const EmailPasswordScreen = ({ dispatch }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { openDialog } = useDialog();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { mutateAsync: checkEmail, isLoading: isEmailCheckLoading } =
    useEmailCheck();

  const { mutateAsync: normalSignUp, isLoading: isNormalSignUpLoading } =
    useNormalSignUp();

  const isActive =
    !validateEmail(email) &&
    email.length > 1 &&
    !validatePassword(password) &&
    password.length > 1;

  const handleNormalSignUp = async () => {
    await normalSignUp({ email, password });
    dispatch({
      type: UserInfoStatus.SET_EMAIL_ADDRESS_PASSWORD,
      emailPassword: { email, password },
    });
    dispatch({
      type: UserInfoStatus.SET_ACCOUNT_TYPE,
      accountType: 'NORMAL',
    });
    navigation.navigate(AuthorizeMenu.AgreeToTerm);
  };

  const handleAuthorize = async () => {
    const checkInfo = await checkEmail(email);
    if (checkInfo.data?.check) handleNormalSignUp();
    else openDialog({ text: '중복된 이메일입니다.', type: 'validate' });
  };

  if (isEmailCheckLoading || isNormalSignUpLoading)
    return <CommonLoading isActive backgroundColor={colors.background} />;

  return (
    <ScreenCover
      authorizeButton={{
        handlePress: handleAuthorize,
        label: '확인',
        isActive,
      }}
      titleElements={[i18n.t('email_and_password'), i18n.t('enter')]}
    >
      <EssentialInput
        validation={validateEmail}
        label={i18n.t('email')}
        value={email}
        setValue={setEmail}
        type="email"
      />
      <EssentialInput
        validation={validatePassword}
        label={i18n.t('password')}
        value={password}
        setValue={setPassword}
        type="password"
      />
    </ScreenCover>
  );
};

export default EmailPasswordScreen;
